import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import ReviewCard from "./ReviewCard";

export default function HostReview({ reviews = [] }) {
  const { auth } = usePage().props;
  const user = auth?.user;

  const [collapsed] = useState(false);

  console.log("auth:", auth);
  console.log("reviews:", reviews);

  return (
    <AuthenticatedLayout user={user} header={<h2 className="font-medium">Сэтгэгдэл</h2>}>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar collapsed={collapsed} className="border-r bg-white shadow-md">
          <Menu className="font-medium">
            <MenuItem>
              <Link href="/dashboard">Үндсэн хэсэг</Link>
            </MenuItem>
            <MenuItem>
              <Link href={route("host.create")}>Байр нэмэх</Link>
            </MenuItem>
            <MenuItem>
              <Link href={route("host.index")}>Бүртгүүлсэн байр</Link>
            </MenuItem>
            <MenuItem>
              <Link href={route("host.BookingInfo")}>Захиалгын мэдээлэл</Link>
            </MenuItem>
            <MenuItem>
              <Link href={route("host.Review")}>Сэтгэгдэл харах</Link>
            </MenuItem>
          </Menu>
        </Sidebar>

        <div className="flex-1 p-6">
          <div className="p-6 bg-white border shadow-sm rounded-3xl border-gray-100">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Танд бичсэн сэтгэгдлүүд
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Сайн байна уу, {user?.name}
              </p>
            </div>

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