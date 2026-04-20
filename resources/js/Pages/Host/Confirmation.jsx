import { usePage, Link } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Navbar from "@/Components/Navbar/Navbar";

export default function Confirmation() {
  const { booking } = usePage().props;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-3xl px-4 py-12 mx-auto">
        <Card className="rounded-3xl shadow-lg">
          <CardContent className="p-8 space-y-6">
            <h1 className="text-3xl font-bold text-green-600">
              Захиалга амжилттай үүслээ
            </h1>

            <p className="text-slate-600">
              Таны захиалга хадгалагдлаа.
            </p>

            <div className="p-4 space-y-3 border rounded-2xl">
              <p>
                <strong>Байр:</strong> {booking.listing.title}
              </p>
              <p>
                <strong>Check-in:</strong>{" "}
                {format(new Date(booking.start_date), "yyyy-MM-dd")}
              </p>
              <p>
                <strong>Check-out:</strong>{" "}
                {format(new Date(booking.end_date), "yyyy-MM-dd")}
              </p>
              <p>
                <strong>Нийт үнэ:</strong> ₮{booking.total_price}
              </p>
              <p>
                <strong>Төлөв:</strong> {booking.booking_status}
              </p>
              <p>
                <strong>Төлбөр:</strong> {booking.is_paid ? "Төлөгдсөн" : "Төлөгдөөгүй"}
              </p>
            </div>

            <Link href="/">
              <Button className="w-full rounded-2xl">
                Нүүр хуудас руу буцах
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}