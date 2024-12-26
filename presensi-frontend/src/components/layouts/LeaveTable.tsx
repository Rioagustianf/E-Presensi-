import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  // Simple date format (e.g., "12/12/2024")
  return date.toLocaleDateString(); // To format as MM/DD/YYYY
};

export const LeaveTable = ({ permission }: { permission: any[] }) => {
  // Validasi data izin
  const permissions = permission && permission.length > 0 ? permission : [];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Alasan</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {permissions.length > 0 ? (
          permissions.map((record, index) => (
            <TableRow key={index}>
              <TableCell>{formatDate(record.created_at)}</TableCell>
              <TableCell>{record.student.name}</TableCell>
              <TableCell>{record.reason}</TableCell>
              <TableCell>
                <Badge
                  variant={record.status === "Approved" ? "success" : "warning"}
                >
                  {record.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} style={{ textAlign: "center" }}>
              Data izin belum ada.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
