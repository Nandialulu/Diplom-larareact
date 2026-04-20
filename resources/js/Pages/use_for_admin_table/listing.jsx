import {Table,TableBody,TableCell, TableHead,TableHeader,TableRow,} from "@/components/ui/table";

export function ListingsTable({ listings }) {
  return (
    <div className="mt-6 border rounded-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>№</TableHead>
            <TableHead>Нэр</TableHead>
            <TableHead>Үнэ</TableHead>
            <TableHead>Төлөв</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {listings?.map((l, i) => (
            <TableRow key={l.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{l.title}</TableCell>
              <TableCell>{l.price_per_day}₮</TableCell>
              <TableCell>{l.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}