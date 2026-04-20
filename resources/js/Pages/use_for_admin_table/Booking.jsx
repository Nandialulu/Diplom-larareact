import { Badge } from "@/components/ui/badge";
import {Table,TableBody,TableCell, TableHead,TableHeader,TableRow,} from "@/components/ui/table";

export function BookingTable({ bookings }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-600">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-600">Cancelled</Badge>;
      case "unpaid":
        return <Badge className="bg-yellow-100 text-yellow-600">Unpaid</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="mt-6 border rounded-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>№</TableHead>
            <TableHead>Байр</TableHead>
            <TableHead>Огноо</TableHead>
            <TableHead>Төлөв</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {bookings?.length > 0 ? (
            bookings.map((b, i) => (
              <TableRow key={b.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{b.listing?.title}</TableCell>
                <TableCell>
                  {new Date(b.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{getStatusBadge(b.status)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-400">
                Захиалга байхгүй
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}