import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { MapPinIcon } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface LocationMapCardProps {
  location: [number, number] | null;
  error: string | null;
  isWithinSchoolRadius: boolean | null;
  onCaptureLocation: () => void;
}

export const LocationMapCard: React.FC<LocationMapCardProps> = ({
  location,
  error,
  isWithinSchoolRadius,
  onCaptureLocation,
}) => (
  <div className="card">
    <div className="card-header">
      <h2>Lokasi Presensi</h2>
    </div>
    <div className="card-content">
      <div className="aspect-video rounded-lg overflow-hidden mb-4">
        {location ? (
          <MapContainer
            center={location}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {location && (
              <Marker position={location}>
                <Popup>Lokasi Anda saat ini</Popup>
              </Marker>
            )}
          </MapContainer>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
            {error ? error : "Memuat lokasi Anda..."}
          </div>
        )}
      </div>
      <Button onClick={onCaptureLocation} className="w-full bg-[#071952]">
        <MapPinIcon className="mr-2 h-4 w-4" />
        {location ? "Segarkan Lokasi" : "Ambil Lokasi"}
      </Button>
      {location && (
        <p className="mt-2 text-sm text-gray-600 text-center">
          Lokasi: {location[0].toFixed(6)}, {location[1].toFixed(6)}
        </p>
      )}
      {isWithinSchoolRadius !== null && (
        <p
          className={`mt-2 text-sm text-center ${
            isWithinSchoolRadius ? "text-green-600" : "text-red-600"
          }`}
        >
          {isWithinSchoolRadius
            ? "Dalam radius sekolah"
            : "Di luar radius sekolah"}
        </p>
      )}
    </div>
  </div>
);
