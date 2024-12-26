import { axiosInstance } from "@/lib/axios";

export const loginUser = async (email: string, password: string) => {
  try {
    if (!email || !password) {
      console.log("Email or password is missing.");
      return null;
    }

    // Mengirimkan request login
    const response = await axiosInstance.post("/api/login", {
      email,
      password,
    });

    // Jika login berhasil dan response berisi data token
    if (response && response.data && response.data.token) {
      // Menyimpan token ke localStorage
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("role", response.data.role);
      return { token: response.data.token, role: response.data.role }; // Mengembalikan objek dengan token
    } else {
      console.log("Login failed, no token found.");
      return null;
    }
  } catch (error) {
    console.log("Error during login:", error);
    return null;
  }
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  nis: string,
  studentClass: string,
  homeroomTeacher: string
) => {
  try {
    if (
      !name ||
      !email ||
      !password ||
      !passwordConfirmation ||
      !nis ||
      !studentClass ||
      !homeroomTeacher
    ) {
      throw new Error("All fields are required.");
    }

    const response = await axiosInstance.post("/api/register", {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      nis,
      class: studentClass,
      homeroom_teacher_id: homeroomTeacher,
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw error.response.data; // Kirimkan pesan error spesifik dari API
    }
    throw new Error(error.message || "Registration failed.");
  }
};

export const getStudent = async () => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.log("No token found in localStorage.");
      return null;
    }

    const response = await axiosInstance.get("/api/student");
    return response.data;
  } catch (error) {
    console.log("Error fetching user data:", error);
    return null;
  }
};

// Update loginWaliKelas
export const loginWaliKelas = async (email: string, password: string) => {
  try {
    if (!email || !password) {
      console.log("Email or password is missing.");
      return null;
    }

    // Mengirimkan request login
    const response = await axiosInstance.post("/api/login/wali-kelas", {
      email,
      password,
    });

    // Jika login berhasil dan response berisi data token
    if (response) {
      // Menyimpan token ke localStorage
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("userName", response.data.user.name);

      return { token: response.data.token, role: response.data.role }; // Mengembalikan objek dengan token
    } else {
      console.log("Login failed, no token found.");
      return null;
    }
  } catch (error) {
    console.log("Error during login:", error);
    return null;
  }
};

export const logOut = async () => {
  try {
    const response = await axiosInstance.post("/api/logout");
    return response.data;
  } catch (error) {
    console.log("Error during logout:", error);
    return null;
  }
};
