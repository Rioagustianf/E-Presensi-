import React, { createContext, useContext, useState, useEffect } from "react";
import { getStudent } from "@/service/api-service/authService";
import LogoLoader from "@/components/layouts/Logo-Loader";

// Membuat context
const UserContext = createContext<any>(null);

// Membuat provider
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string>("User");
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const loadUserFromLocalStorage = () => {
      const savedUser = localStorage.getItem("userName");
      if (savedUser) {
        setUser(savedUser); // Menggunakan data dari localStorage
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await getStudent();
        if (response && response.name) {
          setUser(response.name);
          localStorage.setItem("userName", response.name); // Menyimpan nama pengguna ke localStorage
        } else {
          console.log("Failed to fetch user data.");
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromLocalStorage(); // Memuat data dari localStorage
    if (!localStorage.getItem("userName")) {
      fetchUser(); // Jika tidak ada data di localStorage, fetch dari API
    }
  }, []);

  // Menampilkan loading saat menunggu data
  if (loading) {
    return <LogoLoader />; // Anda bisa menyesuaikan dengan tampilan loading yang diinginkan
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// Hook untuk menggunakan context di komponen lain
export const useUser = () => useContext(UserContext);
