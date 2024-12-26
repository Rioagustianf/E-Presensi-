import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, User, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/layouts/Navbar";
import {
  getHomeroomTeachers,
  getStudentByHomeroomTeacherId,
} from "@/service/api-service/homeroomTeacherService";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Swal from "sweetalert2";
import { PDFDownloadLink } from "@react-pdf/renderer";
import StudentPDF from "@/components/layouts/StudentPdf";
import StudentCSV from "@/components/layouts/StudentCSV";
import StudentXLSX from "@/components/layouts/StudentCSV";
import LogoLoader from "@/components/layouts/Logo-Loader";

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
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const WaliKelasDashboard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [teacher, setTeacher] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const response = await getHomeroomTeachers();
          const homeroomTeacher = response;
          setTeacher(homeroomTeacher);

          if (homeroomTeacher?.id) {
            await fetchStudentData(homeroomTeacher.id);
          }
        } else {
          console.log("No token found in localStorage.");
        }
      } catch (error) {
        console.log("Error fetching teacher data:", error);
      }
    };

    const fetchStudentData = async (homeroomTeacherId: number) => {
      try {
        const response = await getStudentByHomeroomTeacherId(homeroomTeacherId);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student by homeroom teacher ID:", error);
        setLoading(false);
      }
    };

    fetchTeacher();
  }, []);

  if (loading) {
    return <LogoLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4 pt-20">
        <Card className="mb-4 w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Dashboard Wali Kelas
            </CardTitle>
            <CardDescription>
              Rekap data kelas {teacher?.class_name || "Anda"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  Wali Kelas: {teacher?.name || "Tidak diketahui"}
                </h2>
                <p className="text-gray-600">Total Siswa: {data.length}</p>
              </div>
              <div className="space-x-2">
                <PDFDownloadLink
                  document={<StudentPDF teacher={teacher} students={data} />}
                  fileName="rekap-siswa.pdf"
                >
                  {({ loading }) => (
                    <Button disabled={loading}>
                      <Download className="mr-2 h-4 w-4" />
                      {loading ? "Mengunduh PDF..." : "Unduh PDF"}
                    </Button>
                  )}
                </PDFDownloadLink>
                <StudentXLSX teacher={teacher} students={data} />
              </div>
            </div>
            <Tabs defaultValue="students" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="students">Daftar Siswa</TabsTrigger>
                <TabsTrigger value="attendance">Kehadiran & Izin</TabsTrigger>
              </TabsList>
              <TabsContent value="students">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead>Total Kehadiran</TableHead>
                      <TableHead>Total Izin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((siswa) => (
                      <TableRow key={siswa.id}>
                        <TableCell>{siswa.id}</TableCell>
                        <TableCell className="font-medium">
                          {siswa.name}
                        </TableCell>
                        <TableCell>{siswa.presences?.length || 0}</TableCell>
                        <TableCell>{siswa.permissions?.length || 0}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="attendance">
                <ScrollArea className="h-[600px] rounded-md border p-4">
                  {data.map((siswa) => (
                    <div key={siswa.id} className="mb-8">
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <User className="mr-2" /> {siswa.name}
                      </h3>
                      <Tabs defaultValue="presence" className="w-full">
                        <TabsList className="mb-2">
                          <TabsTrigger value="presence">Kehadiran</TabsTrigger>
                          <TabsTrigger value="permission">Izin</TabsTrigger>
                        </TabsList>
                        <TabsContent value="presence">
                          {siswa.presences?.length > 0 ? (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Tanggal</TableHead>
                                  <TableHead>Waktu Check In</TableHead>
                                  <TableHead>Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {siswa.presences.map((presence) => (
                                  <TableRow key={presence.id}>
                                    <TableCell>
                                      <div className="flex items-center">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        {formatDate(presence.check_in)}
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex items-center">
                                        <Clock className="mr-2 h-4 w-4" />
                                        {formatTime(presence.check_in)}
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <Badge
                                        variant={
                                          presence.status === "Hadir"
                                            ? "success"
                                            : "warning"
                                        }
                                      >
                                        {presence.status}
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          ) : (
                            <p className="text-gray-500 italic">
                              Belum ada data kehadiran
                            </p>
                          )}
                        </TabsContent>
                        <TabsContent value="permission">
                          {siswa.permissions?.length > 0 ? (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Tanggal</TableHead>
                                  <TableHead>Alasan</TableHead>
                                  <TableHead>Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {siswa.permissions.map((permission) => (
                                  <TableRow key={permission.id}>
                                    <TableCell>
                                      <div className="flex items-center">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        {formatDate(permission.created_at)}
                                      </div>
                                    </TableCell>
                                    <TableCell>{permission.reason}</TableCell>
                                    <TableCell>
                                      <Badge
                                        variant={
                                          permission.status === "Diterima"
                                            ? "success"
                                            : "destructive"
                                        }
                                      >
                                        {permission.status}
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          ) : (
                            <p className="text-gray-500 italic">
                              Belum ada izin
                            </p>
                          )}
                        </TabsContent>
                      </Tabs>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WaliKelasDashboard;
