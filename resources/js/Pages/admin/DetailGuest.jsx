import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookingTable } from "../use_for_admin_table/Booking";
import { ReportsTable } from "../use_for_admin_table/Report";

export default function DetailGuest() {
  const { guest } = usePage().props;
  
  if (!guest) {
    return (
      <AdminLayout header={<h2>Бүх зочид</h2>}>
        <div className="p-6 text-center text-gray-500">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  const avatarUrl = guest.avatar
    ? `/storage/${guest.avatar}`
    : "https://via.placeholder.com/120";

  const riskClass =
    guest.risk_score === "low"
      ? "bg-green-100 text-green-600"
      : guest.risk_score === "medium"
      ? "bg-yellow-100 text-yellow-600"
      : guest.risk_score === "high"
      ? "bg-red-100 text-red-600"
      : "bg-gray-100 text-gray-600";

  console.log(guest);

  return (
    <AdminLayout
      header={<h2 className="text-base font-medium">Түрээслэгчийн Дэлгэрэнгүй</h2>}
    >
      <Card className="shadow-sm rounded-2xl">
        <CardContent className="p-6 text-center">
          <img
            src={avatarUrl}
            alt={guest.name}
            className="object-cover w-24 h-24 mx-auto mb-4 border-4 border-white rounded-full shadow"
          />

          <h2 className="text-xl font-semibold text-slate-800">
            {guest.name}
          </h2>

          <p className="text-sm text-slate-500">{guest.email}</p>

          <p className="mt-4 text-sm text-slate-600">
            {guest.bio || "Одоогоор танилцуулга нэмээгүй байна."}
          </p>

          <Separator className="my-5" />

          <div className="space-y-2 text-sm text-left text-slate-600">
            <p>
              <span className="font-medium">Хэл:</span>{" "}
              {guest.language || "Мэдээлэл байхгүй"}
            </p>
            <p>
              <span className="font-medium">Ажил:</span>{" "}
              {guest.job || "Мэдээлэл байхгүй"}
            </p>
          </div>

          <div className="mt-6">
            <p className="mb-1 text-sm text-gray-500">Эрсдэлийн түвшин</p>

            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${riskClass}`}
            >
              {guest.risk_score || "unknown"}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-6 text-center text-sm">
            <div className="p-4 bg-gray-100 rounded-xl">
              {/* controller deer baigaa */}
              {guest.bookings_count ?? 0}
              <p className="text-xs text-gray-500">Захиалга</p>
            </div>

            <div className="p-4 bg-gray-100 rounded-xl">
              {guest.cancelled_count ?? 0}
              <p className="text-xs text-gray-500">Цуцалсан</p>
            </div>

            <div className="p-4 bg-gray-100 rounded-xl">
              {guest.unpaid_count ?? 0}
              <p className="text-xs text-gray-500">Төлөөгүй</p>
            </div>

            <div className="p-4 bg-gray-100 rounded-xl">
              {guest.reports_count ?? 0}
              <p className="text-xs text-gray-500">Гомдол</p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {/* zahialga, report */}
            <ReportsTable reports={guest.reports || []} />
            <BookingTable booking={guest.booking || []} />
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}