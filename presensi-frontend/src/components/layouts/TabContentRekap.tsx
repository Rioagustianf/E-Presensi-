import React, { useEffect, useState } from "react";
import { TabListLayout } from "./TabList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AttendanceTable } from "./AttendanceTable";
import { LeaveTable } from "./LeaveTable";
import { UserCheck, UserX } from "lucide-react";
import { fetchPresencesByStudentId } from "@/service/api-service/attendenceService";
import { getStudent } from "@/service/api-service/authService";
import { Loading } from "./Loading";

export const TabContentRekap = () => {
  const [presences, setPresences] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [student, setStudent] = useState<any>([]);

  const [totalPresentDays, setTotalPresentDays] = useState(0);
  const [totalAbsentDays, setTotalAbsentDays] = useState(0);
  const [leaveDaysTaken, setLeaveDaysTaken] = useState(0);

  // Ambil studentId dari token yang disimpan di localStorage
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      setError("Token tidak ditemukan, harap login terlebih dahulu.");
      return;
    }

    const fetchStudent = async () => {
      try {
        // Asumsi API bisa mengekstrak studentId dari token
        const response = await getStudent(authToken); // Kirim token untuk mendapatkan data mahasiswa
        console.log("Student data:", response);
        const studentIdFromApi = response.id; // Asumsi API mengembalikan `id`
        setStudent(response);
        loadPresences(studentIdFromApi); // Ambil data presensi menggunakan studentId dari response API
      } catch (error) {
        console.error("Error fetching student:", error);
        setError("Gagal memuat data mahasiswa");
      }
    };

    fetchStudent();
  }, []); // Hanya dijalankan sekali saat komponen dimuat

  const loadPresences = async (studentId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPresencesByStudentId(studentId);
      setPresences(data);

      // Update statistik
      const presentDays = data.filter(
        (item: any) => item.status === "hadir"
      ).length;
      const absentDays = data.filter(
        (item: any) => item.status === "tidak_hadir"
      ).length;
      const leaveDays = data.filter(
        (item: any) => item.status === "izin"
      ).length;

      setTotalPresentDays(presentDays);
      setTotalAbsentDays(absentDays);
      setLeaveDaysTaken(leaveDays);
    } catch (err) {
      setError("Gagal memuat data presensi");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <TabListLayout value="rekap">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Rekap Absensi</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Presensi
              </CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPresentDays}</div>
              <p className="text-xs text-muted-foreground">
                dari {presences.length} hari
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Absent Days
              </CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAbsentDays}</div>
              <p className="text-xs text-muted-foreground">
                including weekends and holidays
              </p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="attendance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="attendance">Catatan Kehadiran</TabsTrigger>
            <TabsTrigger value="leave">Catatan Tidak Hadir</TabsTrigger>
          </TabsList>
          <TabsContent value="attendance" className="space-y-4">
            <AttendanceTable presences={presences} />
          </TabsContent>
          <TabsContent value="leave" className="space-y-4">
            <LeaveTable presences={presences} />
          </TabsContent>
        </Tabs>
      </div>
    </TabListLayout>
  );
};
