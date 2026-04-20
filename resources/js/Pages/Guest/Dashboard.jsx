import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

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

        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="shadow-md rounded-2xl col-span-2">
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-medium text-gray-800">
                  Үндсэн мэдээлэл
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="p-4 text-center bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold">{totalBookings}</p>
                    <p className="text-sm text-gray-500">
                      Захиалга хийсэн байр
                    </p>
                  </div>

                  <div className="p-4 text-center bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold">{totalReviews}</p>
                    <p className="text-sm text-gray-500">Сэтгэгдэл</p>
                  </div>

                  <div className="p-4 text-center bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold">{averageRating}</p>
                    <p className="text-sm text-gray-500">Дундаж үнэлгээ</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md rounded-2xl">
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  Таны тухай
                </h3>

                <Separator className="mb-4" />

                <p className="text-sm leading-7 text-gray-600">
                  {user?.bio || "Хэрэглэгч өөрийн танилцуулга оруулаагүй байна."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}