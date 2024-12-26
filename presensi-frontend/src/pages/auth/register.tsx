import { useState, useEffect } from "react";
import { registerUser } from "@/service/api-service/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { getHomeroomTeachersRegister } from "@/service/api-service/homeroomTeacherService";
import Swal from "sweetalert2";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    kelas: "",
    nis: "",
    password: "",
    passwordConfirm: "",
    homeroomTeacher: "",
  });

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getHomeroomTeachersRegister();
        setTeachers(response);
      } catch (error) {
        console.error("Error fetching homeroom teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" }); // Reset error untuk field ini
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await registerUser(
        formData.name,
        formData.email,
        formData.password,
        formData.passwordConfirm,
        formData.nis,
        formData.kelas,
        formData.homeroomTeacher
      );

      Swal.fire("Berhasil", "Registrasi berhasil", "success");
      navigate("/auth/login");
    } catch (err: any) {
      if (err.errors) {
        setErrors(err.errors); // Set pesan error dari API
      } else {
        Swal.fire("Gagal", err.message || "Registrasi gagal", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="mx-auto w-full max-w-md space-y-6 p-6 bg-white rounded-xl shadow-md">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Daftar</h1>
            <p className="text-gray-500">Buat akun baru</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                id: "name",
                label: "Nama Lengkap",
                type: "text",
                placeholder: "John Doe",
              },
              { id: "kelas", label: "Kelas", type: "text", placeholder: "" },
              { id: "nis", label: "NIS", type: "text", placeholder: "" },
              {
                id: "email",
                label: "Email",
                type: "email",
                placeholder: "nama@sekolah.com",
              },
              {
                id: "password",
                label: "Kata Sandi",
                type: "password",
                placeholder: "",
              },
              {
                id: "passwordConfirm",
                label: "Konfirmasi Kata Sandi",
                type: "password",
                placeholder: "",
              },
            ].map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.id]}
                  onChange={handleChange}
                  required
                />
                {errors[field.id] && (
                  <p className="text-red-500 text-sm">{errors[field.id]}</p>
                )}
              </div>
            ))}
            <div className="space-y-2">
              <Label htmlFor="homeroomTeacher">Wali Kelas</Label>
              <Select
                value={formData.homeroomTeacher}
                onValueChange={(value) =>
                  setFormData({ ...formData, homeroomTeacher: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Wali Kelas" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher: any) => (
                    <SelectItem key={teacher.id} value={teacher.id.toString()}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.homeroomTeacher && (
                <p className="text-red-500 text-sm">{errors.homeroomTeacher}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Memproses..." : "Daftar"}
            </Button>
          </form>
          <div className="text-center text-sm">
            Sudah punya akun?{" "}
            <Link to="/auth/login" className="underline">
              Masuk di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
