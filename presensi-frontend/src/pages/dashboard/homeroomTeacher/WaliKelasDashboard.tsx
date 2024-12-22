import React, { useState } from "react";
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
import { Download } from "lucide-react";
import Navbar from "@/components/layouts/Navbar";

// Data dummy untuk contoh
const rekapData = [
  { id: 1, nama: "Andi", kehadiran: "95%" },
  { id: 2, nama: "Budi", kehadiran: "90%" },
  { id: 3, nama: "Citra", kehadiran: "100%" },
  { id: 4, nama: "Deni", kehadiran: "98%" },
  { id: 5, nama: "Eka", kehadiran: "85%" },
];

const WaliKelasDashboard: React.FC = () => {
  const [data] = useState(rekapData);

  const downloadRekap = () => {
    const headers = ["ID", "Nama", "Nilai", "Kehadiran"];
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        [row.id, row.nama, row.nilai, row.kehadiran].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "rekap_kelas.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container min-h-screen flex justify-center items-center mx-auto p-4">
        <Card className="mb-4 w-full">
          <CardHeader>
            <CardTitle>Dashboard Wali Kelas</CardTitle>
            <CardDescription>Rekap data kelas Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={downloadRekap} className="mb-4">
              <Download className="mr-2 h-4 w-4" /> Unduh Rekap
            </Button>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Kehadiran</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((siswa) => (
                  <TableRow key={siswa.id}>
                    <TableCell>{siswa.id}</TableCell>
                    <TableCell>{siswa.nama}</TableCell>
                    <TableCell>{siswa.kehadiran}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default WaliKelasDashboard;
