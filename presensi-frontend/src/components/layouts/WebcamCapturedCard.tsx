import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useCallback, useRef, useState } from "react";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

interface WebcamCaptureCardProps {
  onCapture: (capturedPhoto: string | null) => void;
}

// Helper function to convert base64 to File
const base64ToFile = (base64: string, fileName: string): File => {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const byteArray = new Uint8Array(
      Math.min(1024, byteCharacters.length - offset)
    );
    for (let i = 0; i < byteArray.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(offset + i);
    }
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: "image/jpeg" });
  return new File([blob], fileName, { type: "image/jpeg" });
};

export const WebcamCaptureCard: React.FC<WebcamCaptureCardProps> = ({
  onCapture,
}) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const file = base64ToFile(imageSrc, "captured-image.jpg");
      setCapturedImage(imageSrc);
      onCapture(file); // Pass File instead of base64
    }
  }, [onCapture]);

  return (
    <div className="card">
      <div className="card-header">
        <h2>Foto Presensi</h2>
      </div>
      <div className="card-content">
        <div className="aspect-video rounded-lg overflow-hidden mb-4">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-full object-cover"
          />
        </div>
        <Button onClick={capture} className="w-full bg-[#071952]">
          <Camera className="mr-2 h-4 w-4" /> Ambil Foto
        </Button>
        {capturedImage && (
          <div className="mt-4">
            <h3>Hasil Foto:</h3>
            <img
              src={capturedImage}
              alt="Hasil Foto"
              className="rounded-md w-full object-cover" // Perbaiki tampilan gambar
            />
          </div>
        )}
      </div>
    </div>
  );
};
