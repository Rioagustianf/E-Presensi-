import { Clock, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 h">
      <header className="bg-[#071952] text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="../../public/assets/logo1.png"
              alt="SMA Putra Indonesia"
              width={40}
              height={40}
            />
            <span className="text-xl font-semibold">E-Presensi</span>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link
              to="/auth/login"
              className="hover:text-gray-300 transition-colors"
            >
              Masuk
            </Link>
            <Link
              to="/auth/register"
              className="hover:text-gray-300 transition-colors"
            >
              Daftar
            </Link>
          </nav>
          <Button variant="outline" size="icon" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </header>
      <main>
        <section className="bg-[#071952] min-h-screen text-white py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="flex  md:flex-row items-center justify-center">
              <div className=" mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Selamat Datang di E-Presensi SMA Putra Indonesia
                </h1>
                <p className="text-xl mb-8 text-center">
                  Sistem presensi digital untuk memudahkan pencatatan kehadiran
                  siswa.
                </p>
                <div className="space-x-4 text-center">
                  <Button asChild>
                    <Link to="/auth/login">Masuk</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/auth/register">Daftar</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Fitur Utama
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2" /> Presensi Real-time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Catat kehadiran siswa secara real-time dengan sistem yang
                    akurat dan efisien.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2" /> Laporan Kehadiran
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Akses laporan kehadiran siswa dengan mudah untuk pemantauan
                    yang lebih baik.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2" /> Keamanan Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Data presensi siswa dijamin aman dengan sistem keamanan yang
                    terpercaya.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; 2024 E-Presensi SMA Putra Indonesia. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
