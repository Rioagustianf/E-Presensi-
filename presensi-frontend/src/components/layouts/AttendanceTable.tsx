import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // To format as MM/DD/YYYY
};

// Helper function to format time
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString(); // To format as HH:mm AM/PM
};

export const AttendanceTable = ({ presences }: { presences: any[] }) => {
  const isEmpty = !presences || presences.length === 0;

  return (
    <Table className="mb-10">
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Check In</TableHead>
          <TableHead>Check Out</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isEmpty ? (
          <TableRow>
            <TableCell colSpan={4} style={{ textAlign: "center" }}>
              Data presensi belum ada.
            </TableCell>
          </TableRow>
        ) : (
          presences.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{formatDate(record.check_in)}</TableCell>
              <TableCell>{formatTime(record.check_in)}</TableCell>
              <TableCell>{formatTime(record.check_out)}</TableCell>
              <TableCell>{record.status}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
