import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/Components/ui/table";
import { router } from "@inertiajs/react";
export default function AllGuest() {
  const { guests = [] } = usePage().props;

  return (
    <AdminLayout header={<h2 className="text-base font-medium">Зочид</h2>} >
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
              {guests.length > 0 ? (
                guests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell>
                      <img
                        src={
                          guest.avatar
                            ? `/storage/${guest.avatar}`
                            : "/images/default-avatar.png"
                        }
                        alt={guest.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </TableCell>

                    <TableCell>{guest.name}</TableCell>
                    <TableCell>{guest.email}</TableCell>
                    <TableCell>{guest.bookings_count ?? 0}</TableCell>
                    <TableCell>
                      {guest.created_at
                        ? new Date(guest.created_at).toLocaleDateString()
                        : "-"}
                    </TableCell>
                   <TableCell className="space-x-2">
                    <Button
                      size="sm"
                      variant={guest.status === "active" ? "destructive" : "default"}
                      onClick={() =>
                        router.patch(route("admin.guests.updateStatus", guest.id), {
                          status: guest.status === "active" ? "inactive" : "active",
                        })
                      }
                    >
                      {guest.status === "active" ? "Block" : "Activate"}
                    </Button>
                  </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={route("admin.DetailGuest", guest.id)}>
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