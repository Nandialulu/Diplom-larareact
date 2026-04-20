import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/Components/ui/table";

export default function AllListing() {
  const { listings = [] } = usePage().props;

  return (
    <AdminLayout header={<h2 className="text-base font-medium">Бүх байр</h2>}>
      <div className="p-6">
        <div className="overflow-x-auto rounded-xl bg-white shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Хаяг</TableHead>
                <TableHead>Категори</TableHead>
                <TableHead>Үнэ</TableHead>
                <TableHead>Огноо</TableHead>
                <TableHead>Төлөв</TableHead>
                <TableHead>Үйлдэл</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {listings.length > 0 ? (
                listings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell>{listing.id}</TableCell>
                    <TableCell>{listing.address}</TableCell>
                    <TableCell>{listing.category ?? "-"}</TableCell>
                    <TableCell>{listing.price_per_day ?? "-"}</TableCell>
                    <TableCell>
                      {listing.created_at
                        ? new Date(listing.created_at).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell>{listing.status ?? "active"}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={route("admin.Detaillisting", listing.id)}>
                          Дэлгэрэнгүй
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Байр олдсонгүй
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