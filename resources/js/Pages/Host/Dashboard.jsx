import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function Dashboard({ auth, listings = [], reviews = [] }) {
  const [collapsed, setCollapsed] = useState(false);

  const user = auth?.user;
// nniit review bolon bairuudiig bodoh
  const totalListings = listings.length;
  const totalReviews = reviews.length;
// stariin dundajiig bodj bna
  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) /
          totalReviews
        ).toFixed(1)
      : "0.0";

  return (
    <AuthenticatedLayout header={<h2 className="font-medium">Үндсэн мэдээлэл</h2>}>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar collapsed={collapsed} className="border-r bg-white shadow-md">
          <Menu className="font-medium">
            <MenuItem><Link href="/dashboard" >Үндсэн хэсэг</Link></MenuItem>
            <MenuItem><Link href={route("host.create")} >Байр нэмэх</Link></MenuItem>
            <MenuItem><Link href={route("host.index")} >Бүртгүүлсэн байр</Link></MenuItem>
            <MenuItem component={<Link href={route("host.BookingInfo")} />} >Захиалгын мэдээлэл</MenuItem>
            <MenuItem><Link href={route("host.Review")}>Сэтгэгдэл харах</Link></MenuItem>
          </Menu>
        </Sidebar>
            {/* Right details */}
            <div className="space-y-6 lg:col-span-2 m-16">
              <Card className="shadow-md rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-medium text-gray-800">
                    Үндсэн мэдээлэл
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="p-4 text-center bg-gray-50 rounded-xl">
                      <p className="text-2xl font-bold text-gray-800">
                        {totalListings}
                      </p>
                      <p className="text-sm text-gray-500">Бүртгүүлсэн байр</p>
                    </div>

                    <div className="p-4 text-center bg-gray-50 rounded-xl">
                      <p className="text-2xl font-bold text-gray-800">
                        {totalReviews}
                      </p>
                      <p className="text-sm text-gray-500">Сэтгэгдэл or Шүүмж</p>
                    </div>

                    <div className="p-4 text-center bg-gray-50 rounded-xl">
                      <p className="text-2xl font-bold text-gray-800">
                        {averageRating}
                      </p>
                      <p className="text-sm text-gray-500">Дундаж үнэлгээ</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    Таны мэдээлэл
                  </h3>
                  <Separator className="mb-4" />
                  <p className="text-sm leading-7 text-gray-600">
                    {user?.bio ||
                      "This host has not added a profile description yet."}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-md rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    Үнэлгээ
                  </h3>
                  <Separator className="mb-4" />

                  {reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.slice(0, 3).map((review) => (
                        <div
                          key={review.id}
                          className="p-4 border rounded-xl bg-gray-50"
                        >
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-800">
                              {review.user?.name || "Guest"}
                            </p>
                            <span className="text-sm text-yellow-500">
                               {review.rating}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-gray-600">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No reviews yet.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
    </AuthenticatedLayout>
  );
}