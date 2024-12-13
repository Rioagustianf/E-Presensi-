import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/service/api-service/authService";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [kelas, setKelas] = useState("");
  const [nis, setNis] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await registerUser(
        name,
        email,
        password,
        passwordConfirm,
        nis,
        kelas
      );

      if (response) {
        alert("Registrasi berhasil! Silakan login.");
        // Redirect atau reset form sesuai kebutuhan
        navigate("/auth/login");
      } else {
        setError("Registrasi gagal. Cek data Anda dan coba lagi.");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat registrasi. Silakan coba lagi.");
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
            <p className="text-gray-500 dark:text-gray-400">Buat akun baru</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kelas">Kelas</Label>
              <Input
                id="kelas"
                type="text"
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nis">NIS</Label>
              <Input
                id="nis"
                type="text"
                value={nis}
                onChange={(e) => setNis(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@sekolah.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Kata Sandi</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">Konfirmasi Kata Sandi</Label>
              <Input
                id="passwordConfirm"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
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
