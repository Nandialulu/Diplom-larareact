import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Star } from "lucide-react"; // ✅ нэмсэн

export default function Dashboard({ auth, bookings = [], reviews = [] }) {
  const [collapsed, setCollapsed] = useState(false);

  const user = auth?.user;

  const totalBookings = bookings.length;
  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) /
          totalReviews
        ).toFixed(1)
      : "0.0";

  return (
    <AuthenticatedLayout header={<h2 className="font-medium">Үндсэн хэсэг</h2>}>
      <div className="flex min-h-screen bg-gray-100">
        
        {/* ✅ SIDEBAR (ХӨНДӨХГҮЙ) */}
        <Sidebar collapsed={collapsed} className="border-r bg-white shadow-md">
          <Menu className="font-medium">
            <MenuItem>
              <Link href={route("guest.Dashboard")}>Үндсэн хэсэг</Link>
            </MenuItem>

            <MenuItem>
              <Link href={route("guest.Mybooking")}>Миний захиалга</Link>
            </MenuItem>

            <MenuItem>
              <Link href={route("guest.Review")}>Сэтгэгдэл</Link>
            </MenuItem>
          </Menu>
        </Sidebar>

        {/* CONTENT */}
        <div className="flex-1 p-6">
          <div className="p-6 border shadow-sm bg-white/80 backdrop-blur-xl rounded-3xl border-gray-100">
            
            {/* HEADER */}
            <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Нийтлэгдсэн сэтгэгдлүүд
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Сайн байна уу, {user?.name || "Хэрэглэгч"}
                </p>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-sm text-gray-500">Нийт сэтгэгдэл</p>
                  <p className="text-xl font-bold text-gray-900">
                    {totalReviews}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-sm text-gray-500">Дундаж үнэлгээ</p>
                  <p className="text-xl font-bold text-amber-500">
                    {averageRating}
                  </p>
                </div>
              </div>
            </div>

            {/* REVIEW LIST */}
            {reviews.length === 0 ? (
              <div className="py-10 text-center text-gray-500">
                Одоогоор review байхгүй
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="p-5 transition bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {r.user?.name || "Хэрэглэгч"}
                        </h3>

                        <div className="flex items-center gap-1 mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= Number(r.rating)
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-gray-600">
                      {r.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </AuthenticatedLayout>
  );
}