import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/authContext";
import { loginUser, loginWaliKelas } from "@/service/api-service/authService";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("siswa");
  const [error, setError] = useState<string>(""); // State untuk menyimpan error
  const [loading, setLoading] = useState<boolean>(false); // State untuk loading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state

    try {
      let response;

      // Pilih login berdasarkan jenis pengguna
      if (userType === "walikelas") {
        response = await loginWaliKelas(email, password);
        localStorage.setItem("role", "walikelas");
      } else {
        response = await loginUser(email, password);
        localStorage.setItem("role", "siswa");
      }

      // Cek apakah login berhasil dan ada token
      if (response?.token) {
        login(userType); // Login dengan role yang dipilih
        localStorage.setItem("token", response.token); // Simpan token
        navigate(
          userType === "walikelas" ? "/dashboard/walikelas" : "/dashboard"
        );
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="mx-auto w-full max-w-md space-y-6 p-6 bg-white rounded-xl shadow-md">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Masuk</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Masuk ke akun Anda
            </p>
          </div>

          {/* Menampilkan error jika ada */}
          {error && (
            <div className="text-red-500 text-center">
              <p>{error}</p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
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
              <Label htmlFor="userType">Masuk Sebagai</Label>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="siswa">Siswa</option>
                <option value="walikelas">Wali Kelas</option>
              </select>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sedang Memuat..." : "Masuk"}
            </Button>
          </form>

          <div className="text-center text-sm">
            Belum punya akun?{" "}
            <Link to="/auth/register" className="underline text-[#071952]">
              Daftar di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
