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
import { fetchPresencesByStudentId } from "@/service/api-service/attendenceService";
import { GetStudentPermissions } from "@/service/api-service/permission";
import { getStudent } from "@/service/api-service/authService";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // To format as MM/DD/YYYY
};

export const TabContentReport = ({ studentId }: { studentId: number }) => {
  const [absensiData, setAbsensiData] = useState<any[]>([]);
  const [ijinData, setIjinData] = useState<any[]>([]);
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      try {
        // Mengambil data absensi dan izin berdasarkan studentId
        const response = await getStudent(token);
        const studentId = response.id;

        const absensiData = await fetchPresencesByStudentId(studentId);
        const ijinData = await GetStudentPermissions(studentId);

        setAbsensiData(absensiData);
        setIjinData(ijinData);

        console.log("Student data:", response);
        console.log("Absensi data:", absensiData);
        console.log("Ijin data:", ijinData);
        setStudent(response);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Laporan Absensi dan Izin</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tanggal</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {absensiData.map((record, index) => (
            <TableRow key={index}>
              <TableCell>{formatDate(record.check_in)}</TableCell>
              <TableCell>{record.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
                  variant={record.status === "Approved" ? "success" : "warning"}
                >
                  {record.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <button
        onClick={downloadPDF}
        className="mt-4 p-2 bg-blue-500 text-white rounded-md"
      >
        Download Laporan PDF
      </button>
    </div>
  );
};
