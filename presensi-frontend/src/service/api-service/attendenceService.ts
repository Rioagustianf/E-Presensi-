import { axiosInstance } from "@/lib/axios";

export const storePresence = async (data: {
  student_id: number;
  check_in: string;
  check_out: string;
  photo?: File;
  latitude: string;
  longitude: string;
  status: "hadir" | "tidak_hadir" | "izin";
}) => {
  const formData = new FormData();
  formData.append("student_id", data.student_id.toString());
  formData.append("check_in", data.check_in);
  formData.append("check_out", data.check_out);
  if (data.photo) formData.append("photo", data.photo);
  formData.append("latitude", data.latitude);
  formData.append("longitude", data.longitude);
  formData.append("status", data.status);

  try {
    const response = await axiosInstance.post("/api/presensi", formData);
    console.log("Presensi berhasil dikirim!", response.data);
  } catch (error) {
    throw new Error("Error saat mengirimkan presensi");
  }
};

export const fetchPresencesByStudentId = async (studentId: number) => {
  try {
    const response = await axiosInstance.get(`/api/presences/${studentId}`);
    return response.data.presences; // Mengembalikan data presensi
  } catch (error) {
    console.error("Error saat mengambil data presensi:", error);
    throw new Error("Tidak dapat mengambil data presensi");
  }
};
