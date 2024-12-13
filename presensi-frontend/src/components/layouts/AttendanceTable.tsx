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
  // Simple date format (e.g., "12/12/2024")
  return date.toLocaleDateString(); // To format as MM/DD/YYYY
};

// Helper function to format time
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  // Simple time format (e.g., "07:59 AM")
  return date.toLocaleTimeString(); // To format as HH:mm AM/PM
};

export const AttendanceTable = ({ presences }: { presences: any[] }) => {
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
        {presences.map((record) => (
          <TableRow key={record.id}>
            <TableCell>{formatDate(record.check_in)}</TableCell>
            <TableCell>{formatTime(record.check_in)}</TableCell>
            <TableCell>{formatTime(record.check_out)}</TableCell>
            <TableCell>{record.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
