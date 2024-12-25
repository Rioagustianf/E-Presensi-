import { axiosInstance } from "@/lib/axios";

export const editStudent = async (
  nis: string,
  name: string,
  studentClass: string
) => {
  try {
    const token = localStorage.getItem("authToken");
    if (token) {
      const response = await axiosInstance.put(
        "/api/update-student",
        { nis, name, class: studentClass },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data;
    }
  } catch (error) {
    console.log("Error updating student data:", error);
    throw error; // Throw error agar bisa di-handle lebih lanjut.
  }
};
