import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileDown } from "lucide-react";
import { fetchPresencesByStudentId } from "@/service/api-service/attendenceService";
import { GetStudentPermissions } from "@/service/api-service/permission";
import { getStudent } from "@/service/api-service/authService";
import { Loading } from "./Loading";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  // Simple time format (e.g., "07:59 AM")
  return date.toLocaleTimeString(); // To format as HH:mm AM/PM
};

export const TabContentReport = ({ studentId }: { studentId: number }) => {
  const [absensiData, setAbsensiData] = useState<any[]>([]);
  const [ijinData, setIjinData] = useState<any[]>([]);
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      try {
        const response = await getStudent(token);
        const studentId = response.id;

        const absensiData = await fetchPresencesByStudentId(studentId);
        const ijinData = await GetStudentPermissions(studentId);

        setAbsensiData(absensiData);
        setIjinData(ijinData);
        setStudent(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Laporan Absensi dan Izin", 20, 20);

    doc.setFontSize(12);
    // Absensi Table
    doc.text("Absensi:", 20, 30);
    doc.setLineWidth(0.5);
    doc.line(20, 32, 200, 32); // Drawing line after heading

    let yOffset = 40;
    // Adding Absensi Data
    doc.text("Tanggal", 20, yOffset);
    doc.text("Status", 120, yOffset);
    yOffset += 10;

    absensiData.forEach((data) => {
      doc.text(formatDate(data.check_in), 20, yOffset);
      doc.text(data.status, 120, yOffset);
      yOffset += 10;
    });

    // Adding spacing before the next section
    yOffset += 10;
    doc.setLineWidth(0.5);
    doc.line(20, yOffset, 200, yOffset); // Line separator
    yOffset += 10;

    // Izin Table
    doc.text("Izin:", 20, yOffset);
    doc.setLineWidth(0.5);
    doc.line(20, yOffset + 2, 200, yOffset + 2); // Drawing line after heading

    yOffset += 10;
    doc.text("Tanggal", 20, yOffset);
    doc.text("Alasan", 120, yOffset);
    doc.text("Status", 180, yOffset);
    yOffset += 10;

    // Adding Izin Data
    ijinData.forEach((data) => {
      doc.text(formatDate(data.created_at), 20, yOffset);
      doc.text(data.reason, 120, yOffset);
      doc.text(data.status, 180, yOffset);
      yOffset += 10;
    });

    // Saving the PDF
    doc.save("laporan_absensi_ijin.pdf");
  };

  const downloadCSV = () => {
    // Membuat header untuk Absensi dan Izin
    const headersAbsensi = ["Tanggal", "Status"];
    const headersIzin = ["Tanggal", "Alasan", "Status"];

    // Menambahkan header untuk bagian Absensi
    let csvContent = "Absensi Report\n";
    csvContent += headersAbsensi.join(",") + "\n";

    // Mengonversi Absensi data ke CSV
    absensiData.forEach((data) => {
      csvContent += [formatDate(data.check_in), data.status].join(",") + "\n";
    });

    // Menambahkan baris kosong atau separator antara Absensi dan Izin
    csvContent += "\n\n"; // Two newlines to separate Absensi and Izin

    // Menambahkan header untuk bagian Izin
    csvContent += "Izin Report\n";
    csvContent += headersIzin.join(",") + "\n";

    // Mengonversi Izin data ke CSV
    ijinData.forEach((data) => {
      csvContent +=
        [formatDate(data.created_at), data.reason, data.status].join(",") +
        "\n";
    });

    // Membuat dan mengunduh file CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "laporan_absensi_ijin.csv");
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <Loading />;

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Laporan Absensi dan Izin</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="absensi" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="absensi">Absensi</TabsTrigger>
              <TabsTrigger value="izin">Izin</TabsTrigger>
            </TabsList>
            <TabsContent value="absensi">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {absensiData.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(record.check_in)}</TableCell>
                      <TableCell>{formatTime(record.check_in)}</TableCell>
                      <TableCell>{record.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="izin">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Alasan</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ijinData.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(record.created_at)}</TableCell>
                      <TableCell>{record.reason}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.status === "Approved" ? "success" : "warning"
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <div className="flex justify-end space-x-2 mt-4">
        <Button className="bg-[#16205e]" onClick={downloadPDF}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
        <Button className="bg-[#16205e]" onClick={downloadCSV}>
          <FileDown className="mr-2 h-4 w-4" />
          Download CSV
        </Button>
      </div>
    </>
  );
};
