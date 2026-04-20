import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function Dashboard({ auth, listings = [], reviews = [], bookings = [] }) {
  const [collapsed, setCollapsed] = useState(false);
  const user = auth?.user;

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length).toFixed(1)
      : 0;
console.log({ auth, listings, reviews, bookings });
  return (
    <AuthenticatedLayout header={<h2 className="font-medium">Профайл</h2>}>
      <div className="flex min-h-screen bg-slate-100">
        {/* Sidebar */}
        <Sidebar collapsed={collapsed} className="border-r bg-white shadow-sm">
          <Menu className="px-2 font-medium">
            <MenuItem component={<Link href={route("dashboard")} />}>
              Үндсэн хэсэг
            </MenuItem>
            <MenuItem component={<Link href={route("host.create")} />}>
              Байр нэмэх
            </MenuItem>
            <MenuItem component={<Link href={route("host.index")} />}>
              Бүртгүүлсэн байр
            </MenuItem>
            
            <MenuItem>
            <Link
              href={
                auth.user.role === "host"
                  ? route("host.BookingInfo")
                  : route("guest.Mybooking")
              }
            >
              Захиалгын мэдээлэл
            </Link>
          </MenuItem>
          </Menu>
        </Sidebar>

        {/* Main */}
        <div className="flex-1 p-6">
          {/* Top stats */}
        
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Profile */}
            <Card className="shadow-sm rounded-2xl">
              <CardContent className="p-6 text-center">
                <img
                  src={
                    user?.avatar
                      ? `/storage/${user.avatar}`
                      : "https://via.placeholder.com/120"
                  }
                  alt={user?.name || "User avatar"}
                  className="object-cover w-24 h-24 mx-auto mb-4 border-4 border-white rounded-full shadow"
                />

                <h2 className="text-xl font-semibold text-slate-800">
                  {user?.name || "Хэрэглэгч"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">{user?.email}</p>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {user?.bio || "Одоогоор танилцуулга нэмээгүй байна."}
                </p>

                <Separator className="my-5" />

                <div className="space-y-2 text-sm text-left text-slate-600">
                  <p><span className="font-medium">Хэл:</span> {user?.language || "Мэдээлэл байхгүй"}</p>
                  <p><span className="font-medium">Ажил:</span> {user?.job || "Мэдээлэл байхгүй"}</p>
                </div>

                <Button asChild className="w-full mt-5">
                  <Link href={route("profile.edit")}>Профайл мэдээлэл засах</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Right side */}
            <div className="space-y-6 lg:col-span-2">
              <Card className="shadow-sm rounded-2xl">
                <CardHeader>
                  <CardTitle>Түргэн үйлдлүүд</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <Button asChild variant="outline">
                    <Link href={route("host.create")}>+ Байр нэмэх</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={route("host.index")}>Миний байрнууд</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={route('host.BookingInfo')}>Захиалгууд</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-sm rounded-2xl">
                <CardHeader>
                  <CardTitle>Сүүлийн байрнууд</CardTitle>
                </CardHeader>
                <CardContent>
                  {listings.length > 0 ? (
                    <div className="space-y-3">
                      {listings.slice(0, 3).map((listing) => (
                        <div
                          key={listing.id}
                          className="flex items-center justify-between p-4 border rounded-xl"
                        >
                          <div>
                            <h4 className="font-semibold text-slate-800">
                              {listing.title || listing.name}
                            </h4>
                            <p className="text-sm text-slate-500">
                              {listing.location || "Байршилгүй"}
                            </p>
                          </div>
                          <Button asChild size="sm" variant="outline">
                            <Link href={route("host.index")}>Харах</Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">Одоогоор байр бүртгэгдээгүй байна.</p>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-sm rounded-2xl">
                <CardHeader>
                  <CardTitle>Сүүлийн сэтгэгдлүүд</CardTitle>
                </CardHeader>
                <CardContent>
                  {reviews.length > 0 ? (
                    <div className="space-y-3">
                      {reviews.slice(0, 3).map((review) => (
                        <div key={review.id} className="p-4 border rounded-xl">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{review.user?.name || "Зочин"}</p>
                            <span className="text-sm text-amber-500">
                              ⭐ {review.rating || 0}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-slate-600">
                            {review.comment || "Сэтгэгдэл байхгүй"}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">Одоогоор сэтгэгдэл алга.</p>
                  )}
                </CardContent>
              </Card>  
              <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 xl:grid-cols-4">
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm text-slate-500">Нийт байр</p>
                <h3 className="mt-2 text-2xl font-bold">{listings.length}</h3>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm text-slate-500">Нийт сэтгэгдэл</p>
                <h3 className="mt-2 text-2xl font-bold">{reviews.length}</h3>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm text-slate-500">Дундаж үнэлгээ</p>
                <h3 className="mt-2 text-2xl font-bold">{avgRating}</h3>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm text-slate-500">Нийт захиалга</p>
                <h3 className="mt-2 text-2xl font-bold">{bookings.length}</h3>
              </CardContent>
            </Card>
          </div>

            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}