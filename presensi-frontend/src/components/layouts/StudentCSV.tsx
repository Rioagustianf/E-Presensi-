import React from "react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { Download } from "lucide-react";

const StudentXLSX = ({
  teacher,
  students,
}: {
  teacher: any;
  students: any[];
}) => {
  const handleDownloadXLSX = () => {
    // Data siswa yang akan dimasukkan ke dalam XLSX
    const wsData = students.map((student) => {
      // Ambil informasi siswa
      const presences =
        student.presences?.map((presence) => ({
          "Tanggal Kehadiran": presence.check_in
            ? new Date(presence.check_in).toLocaleDateString("id-ID")
            : "-",
          "Waktu Check-In": presence.check_in
            ? new Date(presence.check_in).toLocaleTimeString("id-ID")
            : "-",
          "Status Kehadiran": presence.status || "-",
        })) || [];

      const permissions =
        student.permissions?.map((permission) => ({
          "Tanggal Izin": permission.created_at
            ? new Date(permission.created_at).toLocaleDateString("id-ID")
            : "-",
          "Alasan Izin": permission.reason || "-",
          "Status Izin": permission.status || "-",
        })) || [];

      // Gabungkan data siswa dengan data kehadiran dan izin
      return {
        "ID Siswa": student.id,
        Nama: student.name,
        "Total Kehadiran": student.presences?.length || 0,
        "Total Izin": student.permissions?.length || 0,
        ...presences.reduce(
          (acc, presence, index) => ({
            ...acc,
            [`Kehadiran ${
              index + 1
            }`]: `${presence["Tanggal Kehadiran"]} ${presence["Waktu Check-In"]} ${presence["Status Kehadiran"]}`,
          }),
          {}
        ),
        ...permissions.reduce(
          (acc, permission, index) => ({
            ...acc,
            [`Izin ${
              index + 1
            }`]: `${permission["Tanggal Izin"]} ${permission["Alasan Izin"]} ${permission["Status Izin"]}`,
          }),
          {}
        ),
      };
    });

    // Membuat worksheet dan workbook
    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data Siswa");

    // Menyimpan file XLSX
    XLSX.writeFile(wb, `rekap-siswa-${teacher?.class_name}.xlsx`);
  };

  return (
    <Button onClick={handleDownloadXLSX}>
      <Download className="mr-2 h-4 w-4" />
      Unduh XLSX
    </Button>
  );
};

export default StudentXLSX;
