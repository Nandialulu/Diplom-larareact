import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";

export default function DetailListing() {
  const { listing } = usePage().props;

  if (!listing) {
    return (
      <AdminLayout header={<h2 className="text-base font-medium">Байрны дэлгэрэнгүй</h2>}>
        <div className="p-6">Мэдээлэл олдсонгүй.</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout header={<h2 className="text-base font-medium">Байрны дэлгэрэнгүй</h2>}>
      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">

        {/* LEFT SIDE */}
        <div className="space-y-6 lg:col-span-2">

          {/* Images */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-medium">Байрны зураг</h2>
          {/* zurag zasah */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {listing.images?.length > 0 ? (
                  listing.images.map((img, index) => (
                    <img
                      key={index}
                      src={`/storage/${img.img_path}`}
                      alt="listing"
                      className="object-cover w-full h-40 rounded-xl"
                    />
                  ))
                ) : (
                  <img
                    src="https://via.placeholder.com/400"
                    alt="placeholder"
                    className="object-cover w-full h-40 rounded-xl"
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Basic Info */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{listing.title}</h1>

                <Badge>
                  {listing.status || "Pending"}
                </Badge>
              </div>

              <p className="mt-2 text-slate-500">{listing.location}</p>

              <p className="mt-4 text-lg font-medium">
                 {listing.price_per_day}₮ / хоног
              </p>

              <Separator className="my-5" />

              <p className="leading-7 text-slate-600">
                {listing.description || "Тайлбар байхгүй"}
              </p>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Тохижилт</h2>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Статистик</h2>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="p-4 text-center bg-gray-100 rounded-xl">
                  {listing.bookings_count ?? 1}
                  <p className="text-sm text-gray-500">Захиалга</p>
                </div>

                <div className="p-4 text-center bg-gray-100 rounded-xl">
                  {listing.cancelled_count ?? 1}
                  <p className="text-sm text-gray-500">Цуцалсан</p>
                </div>

                <div className="p-4 text-center bg-gray-100 rounded-xl">
                  {listing.reviews_count ?? 1}
                  <p className="text-sm text-gray-500">Сэтгэгдэл</p>
                </div>

                <div className="p-4 text-center bg-gray-100 rounded-xl">
                  ₮ {listing.total_income ?? 1}
                  <p className="text-sm text-gray-500">Орлого</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* Host */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 text-center">
              <img
                src={
                  listing.user?.avatar
                    ? `/storage/${listing.user.avatar}`
                    : "https://via.placeholder.com/100"
                }
                alt="host"
                className="object-cover w-20 h-20 mx-auto rounded-full"
              />

              <h2 className="mt-3 text-lg font-semibold">
                {listing.host?.name}
              </h2>

              <p className="text-sm text-gray-500">
                {listing.host?.email}
              </p>

       <p className="mt-3 text-sm text-gray-500">
          Бүртгүүлсэн огноо:{" "}
          {listing.host?.created_at
            ? new Date(listing.host.created_at).toLocaleDateString()
            : "Мэдээлэл алга"}
        </p>
            </CardContent>
          </Card>

          {/* Room Info */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 space-y-3">
              <h2 className="text-lg font-semibold">Өрөөний мэдээлэл</h2>

              <p>Унтлагын өрөө: {listing.bedrooms ?? 0}</p>
              <p>Угаалгын өрөө: {listing.bathrooms ?? 0}</p>
              <p>Хүмүүсийн тоо: {listing.guest_number ?? 0}</p>
            </CardContent>
          </Card>

          {/* Admin Actions */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 space-y-3">
              {/* нэрийг өөрчилөх */}
              <h2 className="text-lg font-semibold">Админы үйлдлүүд</h2>
              {/* saijruulah */}
              {/* tatgalzah tuvch baisan */}

              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.post(`/host/listings/${listing.id}/pause`)}
              >
                Түр хаах
              </Button>

              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  if (confirm("Устгах уу?")) {
                    router.delete(`/host/listings/${listing.id}`);
                  }
                }}
              >
                Устгах
             </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </AdminLayout>
  );
}