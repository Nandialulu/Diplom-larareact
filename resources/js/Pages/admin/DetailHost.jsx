import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookingTable } from "../use_for_admin_table/Booking";
import { ReportsTable } from "../use_for_admin_table/Report";
import { RiskBadge } from "../use_for_admin_table/Risk";
import { ListingsTable } from "../use_for_admin_table/listing";
import { IoStar } from "react-icons/io5";

export default function DetailHost() {
  const { props } = usePage();
  const host = props?.host;

  if (!host) {
    return (
      <AdminLayout
        header={<h2 className="text-base font-medium">Бүх түрээслэгч</h2>}
      >
        <div className="p-6">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 text-center">
              <p className="text-slate-500">Host мэдээлэл олдсонгүй.</p>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  const avatarUrl = host?.avatar
    ? `/storage/${host.avatar}`
    : "https://via.placeholder.com/120";

  return (
    <AdminLayout
      header={<h2 className="text-base font-medium">Бүх түрээслэгч</h2>}
    >
      <div className="p-6 space-y-6">
        <Card className="rounded-2xl shadow-sm border border-slate-200">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <img
                src={avatarUrl}
                alt={host?.name || "host avatar"}
                className="object-cover w-24 h-24 mb-4 border-4 border-white rounded-full shadow"
              />

              <h2 className="text-2xl font-semibold text-slate-800">
                {host?.name || "Хэрэглэгч"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {host?.email || "Имэйл байхгүй"}
              </p>

              <p className="max-w-2xl mt-4 text-sm leading-6 text-slate-600">
                {host?.bio || "Одоогоор танилцуулга нэмээгүй байна."}
              </p>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 gap-4 text-sm text-slate-600 md:grid-cols-2">
              <div className="p-4 rounded-xl bg-slate-50">
                <p>
                  <span className="font-medium text-slate-800">Хэл:</span>{" "}
                  {host?.language || "Мэдээлэл байхгүй"}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50">
                <p>
                  <span className="font-medium text-slate-800">Ажил:</span>{" "}
                  {host?.job || "Мэдээлэл байхгүй"}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-2 font-semibold text-slate-800">
                Эрсдэлийн түвшин
              </h3>
              <RiskBadge risk={host?.risk_score ?? 0} />
            </div>

            <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 xl:grid-cols-4">
              <div className="p-4 text-center bg-gray-100 rounded-xl">
                <p className="text-sm text-slate-500">Бүртгүүлсэн байр</p>
                <p className="mt-1 text-xl font-semibold text-slate-800">
                  {host?.listings_count ?? 0}
                </p>
              </div>

              <div className="p-4 text-center bg-gray-100 rounded-xl">
                <p className="text-sm text-slate-500">Захиалгууд</p>
                <p className="mt-1 text-xl font-semibold text-slate-800">
                  {host?.bookings_count ?? 0}
                </p>
              </div>

              <div className="p-4 text-center bg-gray-100 rounded-xl">
                <p className="text-sm text-slate-500">Нийт орлого</p>
                <p className="mt-1 text-xl font-semibold text-slate-800">
                  {host?.total_earnings ?? 0}₮
                </p>
              </div>

              <div className="p-4 bg-gray-100 rounded-xl flex flex-col items-center justify-center">
                <p className="text-sm text-slate-500">Үнэлгээ</p>
                <div className="flex items-center gap-1 mt-1 text-xl font-semibold text-slate-800">
                  <IoStar className="text-yellow-500" />
                  <span>{host?.rating ?? 0}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
            {/* use for admn table */}
        <div className="space-y-6">
          <ReportsTable reports={host?.reports || []} />
          <BookingTable bookings={host?.bookings || []} />
          <ListingsTable listings={host?.listings || []} />
        </div>
      </div>
    </AdminLayout>
  );
}