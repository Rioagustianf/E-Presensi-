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

    // Debugging response
    console.log("Login response:", response);

    // Jika login berhasil dan response berisi data token
    if (response && response.data && response.data.token) {
      // Menyimpan token ke localStorage
      localStorage.setItem("authToken", response.data.token);

      console.log("Login successful:", response.data);
      return { token: response.data.token }; // Mengembalikan objek dengan token
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
  studentClass: string
) => {
  try {
    // Validasi input
    if (
      !name ||
      !email ||
      !password ||
      !passwordConfirmation ||
      !nis ||
      !studentClass
    ) {
      console.log("All fields are required.");
      return null;
    }

    // Mengirimkan request registrasi
    const response = await axiosInstance.post("/api/register", {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      nis,
      class: studentClass,
    });

    // Debugging response
    console.log("Registration response:", response);

    // Jika berhasil, mengembalikan response
    if (response && response.data) {
      console.log("Registration successful:", response.data);
      return response.data;
    } else {
      console.log("Registration failed.");
      return null;
    }
  } catch (error) {
    console.log(
      "Error during registration:",
      error.response?.data || error.message
    );
    return null;
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
