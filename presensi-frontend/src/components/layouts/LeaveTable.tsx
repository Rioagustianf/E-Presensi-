import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const LeaveTable = () => {
  const leaveData = [
    {
      startDate: "2023-06-15",
      endDate: "2023-06-17",
      type: "Annual",
      status: "Approved",
    },
    {
      startDate: "2023-07-10",
      endDate: "2023-07-10",
      type: "Sick",
      status: "Approved",
    },
    {
      startDate: "2023-08-01",
      endDate: "2023-08-03",
      type: "Annual",
      status: "Pending",
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaveData.map((record) => (
          <TableRow key={record.startDate}>
            <TableCell>{record.startDate}</TableCell>
            <TableCell>{record.endDate}</TableCell>
            <TableCell>{record.type}</TableCell>
            <TableCell>
              <Badge
                variant={record.status === "Approved" ? "success" : "warning"}
              >
                {record.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
