import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import { DashboarLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getStudent } from "@/service/api-service/authService";
import { createPermission } from "@/service/api-service/permission";

type FormData = {
  reason: string;
  details: string;
  file: FileList;
};

export const Permission = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [studentId, setStudentId] = useState<number | null>(null);

  const onSubmit = async (data: FormData) => {
    if (studentId === null) {
      console.error("Student ID belum tersedia.");
      return; // Stop submission if studentId is not set
    }

    try {
      // Memanggil fungsi createPermission untuk mengirim data izin
      await createPermission({
        student_id: studentId,
        status: data.reason,
        reason: data.details,
        document: data.file[0],
      });
      Swal.fire("Berhasil", "Izin berhasil dikirim", "success");
    } catch (error) {
      console.error("Error submitting attendance:", error);
      Swal.fire("Gagal", "Terjadi kesalahan saat mengirim izin", "error");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getStudent(); // Memanggil getStudent untuk mendapatkan data siswa
        if (response) {
          setStudentId(response.id); // Menyimpan id siswa
        }
        console.log("User data:", response);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <DashboarLayout title="Permission | E-Presensi SMA Putra Indonesia">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-[#071952]">
              Pengajuan Izin
            </CardTitle>
            <CardDescription>
              Ajukan izin tidak masuk sekolah di sini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="reason">Alasan Izin</Label>
                <select
                  {...register("reason", {
                    required: "Alasan izin harus diisi",
                  })}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">Pilih alasan izin</option>
                  <option value="Sakit">Sakit</option>
                  <option value="Izin">Izin</option>
                  <option value="Keperluan Keluarga">Keperluan Keluarga</option>
                  <option value="Lainya">Lainnya</option>
                </select>

                {errors.reason && (
                  <span className="text-red-500 text-sm">
                    Alasan izin harus diisi
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="details">Keterangan Tambahan</Label>
                <Textarea
                  {...register("details", { required: true })}
                  placeholder="Berikan penjelasan lebih detail tentang izin Anda"
                />
                {errors.details && (
                  <span className="text-red-500 text-sm">
                    Keterangan tambahan harus diisi
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Unggah Surat Izin / Surat Sakit</Label>
                <Input
                  type="file"
                  {...register("file", { required: true })}
                  className="cursor-pointer"
                />
                {errors.file && (
                  <span className="text-red-500 text-sm">
                    Surat izin / surat sakit harus diunggah
                  </span>
                )}
              </div>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-[#071952] hover:bg-[#071952]/90"
                  disabled={studentId === null} // Disable button if studentId is null
                >
                  <Upload className="mr-2 h-4 w-4" /> Ajukan Izin
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboarLayout>
  );
};
