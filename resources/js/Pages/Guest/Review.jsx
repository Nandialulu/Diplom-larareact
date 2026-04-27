import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import ReviewCard from "@/Pages/Host/ReviewCard";

export default function Review({ auth, reviews = [] }) {
  const [collapsed] = useState(false);

  const user = auth?.user;

  return (
    <AuthenticatedLayout header={<h2 className="font-medium">Сэтгэгдэл</h2>}>
      <div className="flex min-h-screen bg-gray-100">
        
        {/* SIDEBAR */}
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
          <div className="p-6 bg-white border shadow-sm rounded-3xl border-gray-100">

            {/* HEADER */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Танд бичсэн сэтгэгдлүүд
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Сайн байна уу, {user?.name}
              </p>
            </div>

            {/* REVIEW LIST */}
            {reviews.length === 0 ? (
              <div className="py-10 text-center text-gray-500">
                Одоогоор танд бичсэн сэтгэгдэл байхгүй байна
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}