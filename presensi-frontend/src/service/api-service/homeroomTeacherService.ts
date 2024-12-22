import { axiosInstance } from "@/lib/axios";

export const getStudentByHomeroomTeacherId = async (
  homeroomTeacherId: number
) => {
  try {
    const response = await axiosInstance.get(
      `/api/students/teacher/${homeroomTeacherId}`
    );
    return response.data; // data akan berisi siswa dengan presensinya
  } catch (error) {
    // Menangani error jika terjadi
    console.error("Terjadi kesalahan saat mengambil data siswa:", error);
    throw error; // atau Anda bisa mengembalikan nilai yang sesuai seperti { message: 'Error' }
  }
};
