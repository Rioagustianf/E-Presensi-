import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/authContext";
import { loginUser } from "@/service/api-service/authService";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password); // loginUser adalah fungsi untuk login menggunakan API
      if (response?.token) {
        login(); // Memanggil login untuk memperbarui status autentikasi
        navigate("/dashboard"); // Arahkan ke dashboard setelah login berhasil
      } else {
        console.error("Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
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
          <form className="space-y-4">
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
            <Button onClick={handleSubmit} type="submit" className="w-full">
              Masuk
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
