import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import {Table,TableBody,TableCell,TableHead,TableHeader, TableRow,} from "@/Components/ui/table";

export default function AllHost() {
  const { hosts = [] } = usePage().props;

  return (
    <AdminLayout header={<h2 className="text-base font-medium">Бүх түрээслүүлэгч</h2>} >
      <div className="p-6">
        <div className="overflow-x-auto rounded-xl bg-white shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Зураг</TableHead>
                <TableHead>Нэр</TableHead>
                <TableHead>И-мэйл</TableHead>
                <TableHead>Захиалгын тоо</TableHead>
                <TableHead>Бүртгүүлсэн огноо</TableHead>
                <TableHead>Төлөв</TableHead>
                <TableHead>Үйлдэл</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {hosts.length > 0 ? (
                hosts.map((hosts) => (
                  <TableRow key={hosts.id}>
                    <TableCell>
                      <img
                        src={
                          hosts.avatar
                            ? `/storage/${hosts.avatar}`
                            : "/images/default-avatar.png"
                        }
                        alt={hosts.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </TableCell>

                    <TableCell>{hosts.name}</TableCell>
                    <TableCell>{hosts.email}</TableCell>
                    <TableCell>{hosts.bookings_count ?? 0}</TableCell>
                    <TableCell>
                      {hosts.created_at
                        ? new Date(hosts.updated_at).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell>{hosts.status ?? "active"}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={route("admin.DetailHost", hosts.id)}>
                          Дэлгэрэнгүй
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Хэрэглэгч олдсонгүй
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}