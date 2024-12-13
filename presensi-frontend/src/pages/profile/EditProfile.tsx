import { useState } from "react";
import { User, Pencil, Save, ArrowBigLeft } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Budi Santoso",
    nis: "12345678",
    class: "XI IPA 2",
    photoUrl: "/placeholder.svg?height=200&width=200",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleClassChange = (value: string) => {
    setProfile({ ...profile, class: value });
  };

  const handleSave = () => {
    // Here you would typically send the updated profile to your backend
    console.log("Saving profile:", profile);
    setIsEditing(false);
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
              <AvatarImage src={profile.photoUrl} alt={profile.name} />
              <AvatarFallback>
                <User className="w-16 h-16" />
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <div className="relative inline-block">
                <Button className="bg-[#071952]" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Upload File
                  </label>
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            )}
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nis">NIS</Label>
              <Input
                id="nis"
                name="nis"
                value={profile.nis}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="class">Kelas</Label>
              {isEditing ? (
                <Select
                  onValueChange={handleClassChange}
                  defaultValue={profile.class}
                >
                  <SelectTrigger id="class">
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="X IPA 1">X IPA 1</SelectItem>
                    <SelectItem value="X IPA 2">X IPA 2</SelectItem>
                    <SelectItem value="XI IPA 1">XI IPA 1</SelectItem>
                    <SelectItem value="XI IPA 2">XI IPA 2</SelectItem>
                    <SelectItem value="XII IPA 1">XII IPA 1</SelectItem>
                    <SelectItem value="XII IPA 2">XII IPA 2</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input id="class" value={profile.class} readOnly />
              )}
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
