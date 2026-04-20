// resources/js/Layouts/DashboardLayout.jsx
import { Link, usePage } from '@inertiajs/react'
import AuthenticatedLayout from './AuthenticatedLayout'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
export default function ProfileLayout({ children, listings = [], reviews = [] }) {
  const { auth } = usePage().props
    const user = auth?.user;
    const totalListings = listings.length;
    const totalReviews = reviews.length;

     const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) /
          totalReviews
        ).toFixed(1)
      : "0.0";
  return (
    <AuthenticatedLayout>
     <div className="flex-1 p-6">
            <h1 className="mb-6 text-xl font-medium text-gray-800">Профайл</h1>
  
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Left profile card */}
              <Card className="shadow-md rounded-2xl">
                <CardContent className="p-6 text-center">
                  <img
                    src={
                      user?.avatar
                        ? `/storage/${user.avatar}`
                        : "https://via.placeholder.com/120"
                    }
                    alt={user?.name}
                    className="object-cover w-24 h-24 mx-auto mb-4 border-4 border-white rounded-full shadow"
                  />
  
                  <h2 className="text-xl font-semibold text-gray-800">
                    {user?.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">{user?.email}</p>
  
                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {user?.bio || "No bio added yet."}
                  </p>
  
                  <Button className="mt-5 w-full">
                    <Link href="/profile">Профайл мэдээлэл засах</Link>
                  </Button>
                </CardContent>
              </Card>
  
              {/* Right details */}
              <div className="space-y-6 lg:col-span-2">
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
                      About Host
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
                      Recent Reviews
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
          </div>
    </AuthenticatedLayout>
  )
}
