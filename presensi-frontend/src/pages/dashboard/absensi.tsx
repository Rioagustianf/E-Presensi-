import { DashboarLayout } from "@/components/layouts/DashboardLayout";
import { LocationMapCard } from "@/components/layouts/LocationMapCard";
import { WebcamCaptureCard } from "@/components/layouts/WebcamCapturedCard";
import { Button } from "@/components/ui/button";
import { storePresence } from "@/service/api-service/attendenceService";
import { getStudent } from "@/service/api-service/authService";
import { CheckCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const schoolLatitude = -6.914744;
const schoolLongitude = 107.613918;
const radius = 20000000;

const getDistanceFromLatLonInMeters = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const Absensi: React.FC = () => {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isWithinSchoolRadius, setIsWithinSchoolRadius] = useState<
    boolean | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [studentId, setStudentId] = useState<number | null>(null);

  const handleLocationCapture = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);
          const isInRadius =
            getDistanceFromLatLonInMeters(
              latitude,
              longitude,
              schoolLatitude,
              schoolLongitude
            ) <= radius;
          setIsWithinSchoolRadius(isInRadius);
          Swal.fire(
            isInRadius ? "Dalam Radius" : "Di Luar Radius",
            isInRadius
              ? "Anda berada dalam radius sekolah"
              : "Anda tidak berada dalam radius sekolah",
            isInRadius ? "success" : "error"
          );
        },
        (err) => {
          setError("Tidak dapat mengambil lokasi Anda.");
          console.error(err);
        }
      );
    } else {
      setError("Geolokasi tidak didukung oleh browser Anda.");
    }
  };

  const resizeImage = (
    file: File,
    maxWidth: number,
    maxHeight: number
  ): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.src = reader.result as string;
      };

      reader.onerror = () => reject("Failed to read image file");

      reader.readAsDataURL(file);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject("Cannot get canvas context");
          return;
        }

        const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
        const width = img.width * ratio;
        const height = img.height * ratio;

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: "image/jpeg",
            });
            resolve(resizedFile);
          } else {
            reject("Failed to convert canvas to Blob");
          }
        }, "image/jpeg");
      };

      img.onerror = () => reject("Failed to load image");
    });
  };

  const handlePhotoCapture = (capturedPhoto: File | null) => {
    if (capturedPhoto) {
      resizeImage(capturedPhoto, 800, 800)
        .then((resizedImage) => {
          setPhoto(resizedImage);
        })
        .catch((error) => {
          console.error("Error resizing image:", error);
        });
    }
  };

  const handleSubmitAttendance = () => {
    if (photo === null) {
      console.log("Foto belum diambil");
      return;
    }

    const checkInDate = new Date().toISOString().replace("T", " ").slice(0, 19);
    const checkOutDate = new Date()
      .toISOString()
      .replace("T", " ")
      .slice(0, 19);

    if (studentId && location && isWithinSchoolRadius !== null) {
      const attendanceData = {
        student_id: studentId,
        check_in: checkInDate,
        check_out: checkOutDate,
        photo: photo,
        latitude: String(location[0]),
        longitude: String(location[1]),
        status: "hadir", // Assuming status is hadir for now
      };

      setIsSubmitting(true);

      storePresence(attendanceData)
        .then(() => {
          setIsSubmitting(false);
          Swal.fire("Berhasil", "Presensi berhasil dikirim", "success");
        })
        .catch((error) => {
          setIsSubmitting(false);
          Swal.fire("Gagal", "Gagal mengirim presensi", "error");
        });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getStudent();
        if (response) {
          setStudentId(response.id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <DashboarLayout title="Absensi | E-Presensi SMA Putra Indonesia">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Absensi</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WebcamCaptureCard onCapture={handlePhotoCapture} />
          <LocationMapCard
            location={location}
            error={error}
            isWithinSchoolRadius={isWithinSchoolRadius}
            onCaptureLocation={handleLocationCapture}
          />
        </div>
        <Button
          onClick={handleSubmitAttendance}
          disabled={
            isSubmitting ||
            !photo ||
            !location ||
            !isWithinSchoolRadius ||
            !studentId
          }
          className={`w-full mt-4 ${
            isSubmitting ||
            !photo ||
            !location ||
            !isWithinSchoolRadius ||
            !studentId
              ? "bg-[#484949] cursor-not-allowed"
              : "bg-[#070d30] hover:bg-[#16205e]"
          } text-white`}
        >
          {isSubmitting ? (
            <span>Loading...</span>
          ) : (
            <>
              <CheckCircleIcon className="h-6 w-6 mr-2" />
              Kirim Absensi
            </>
          )}
        </Button>
      </div>
    </DashboarLayout>
  );
};
