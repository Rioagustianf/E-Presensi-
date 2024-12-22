import { axiosInstance } from "@/lib/axios";
import { useParams } from "react-router-dom";

interface StorePermissionPayload {
  student_id: number;
  status: string;
  reason: string;
  document: File;
}

export const createPermission = async (data: StorePermissionPayload) => {
  try {
    const formData = new FormData();
    formData.append("student_id", String(data.student_id));
    formData.append("status", data.status);
    formData.append("reason", data.reason);
    formData.append("document", data.document);

    const response = await axiosInstance.post("/api/permission", formData);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error submitting permission:", error.response.data);
      throw new Error(
        error.response.data.message || "Error submitting permission"
      );
    } else {
      console.error("Error submitting permission:", error.message);
      throw error;
    }
  }
};

export const GetStudentPermissions = async (studentId: number) => {
  try {
    const response = await axiosInstance.get(`/api/permissions/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching student permissions:", error);
    throw error;
  }
};
