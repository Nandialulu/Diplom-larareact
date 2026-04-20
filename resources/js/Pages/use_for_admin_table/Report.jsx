import {Table,TableBody,TableCell, TableHead,TableHeader,TableRow,} from "@/components/ui/table";

export function ReportsTable({ reports }) {
  return (
    <div className="mt-6 border rounded-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>№</TableHead>
            <TableHead>Хэрэглэгч</TableHead>
            <TableHead>Шалтгаан</TableHead>
            <TableHead>Огноо</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reports?.length > 0 ? (
            reports.map((r, i) => (
              <TableRow key={r.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{r.user?.name || "Unknown"}</TableCell>
                <TableCell>{r.reason}</TableCell>
                <TableCell>
                  {new Date(r.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-400">
                Гомдол байхгүй
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}