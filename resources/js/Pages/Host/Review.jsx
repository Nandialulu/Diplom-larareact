import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import ReviewCard from "./ReviewCard";
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
             <ReviewCard/>
            </div>
          </div>
    </AuthenticatedLayout>
  );
}