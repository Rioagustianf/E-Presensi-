import { useEffect, useState } from "react";
import { User, Pencil, Save, ArrowBigLeft, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { getStudent } from "@/service/api-service/authService";
import { editStudent } from "@/service/api-service/studentService";
import Swal from "sweetalert2";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [student, setStudent] = useState({ name: "", nis: "", class: "" }); // Default values
  const profile = <User2 />;

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await getStudent(); // Fetch data profile
        console.log("Student data:", response);
        setStudent(response);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value })); // Update state saat ada perubahan di input
  };

  const handleSave = async () => {
    try {
      await editStudent(student.nis, student.name, student.class); // Kirim data yang diperbarui ke backend
      setIsEditing(false);
      Swal.fire("Berhasil", "Profil berhasil diperbarui", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire("Gagal", "Terjadi kesalahan saat memperbarui profil", "error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-[#071952]">
            Profil Siswa
          </CardTitle>
          <CardDescription>
            Lihat dan edit informasi profil Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={profile} alt={profile} />
              <AvatarFallback>
                <User className="w-16 h-16" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                name="name"
                value={student.name}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nis">NIS</Label>
              <Input
                id="nis"
                name="nis"
                value={student.nis}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="class">Kelas</Label>
              <Input
                id="class"
                name="class"
                value={student.class}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          {isEditing ? (
            <div className="flex justify-between w-full gap-2 text-white">
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="bg-[#071952] flex "
              >
                <ArrowBigLeft className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-[#071952] hover:bg-[#071952]/90"
              >
                <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
              </Button>
            </div>
          ) : (
            <div className="flex justify-between w-full gap-2 text-white">
              <Button variant="outline" className="bg-[#071952] flex ">
                <Link to={"/dashboard"} className="flex items-center">
                  <ArrowBigLeft className="mr-2 h-4 w-4" /> Cancel
                </Link>
              </Button>
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="bg-[#071952]"
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit Profil
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
