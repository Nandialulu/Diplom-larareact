import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { usePage, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";

import ReviewForm from "@/Components/ReviewForm";
import ReviewList from "@/Components/ReviewList";

export default function Show() {
  const { booking, reviews = [], auth } = usePage().props;

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submit = (e) => {
    e.preventDefault();

    router.post("/reviews", {
      listing_id: booking.listing?.id,
      booking_id: booking.id,
      rating,
      comment,
      type: isHost ? "host_to_guest" : "guest_to_host"
    });
  };


const userId = auth?.id;
// role ялгах салгах хэсэг
const isGuest = userId === booking?.user_id;
const isHost = userId === booking?.listing?.host_id;
console.log(usePage().props);
  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="flex h-screen bg-gray-100">

        {/* Sidebar */}
        <Sidebar className="bg-white shadow">
          <Menu>
            <MenuItem><Link href="/">Үндсэн мэдээлэл</Link></MenuItem>
            <MenuItem><Link href={route("guest.Mybooking")}>Миний захиалга</Link></MenuItem>
            <MenuItem><Link href={route("guest.Review")}>Сэтгэгдэл</Link></MenuItem>
          </Menu>
        </Sidebar>
        {/* review  */}
      <div className="flex-1 p-6 space-y-6 font-medium">

          {isGuest && (
            <ReviewForm className="font-medium"
              title="Байрны эзэнд сэтгэгдэл бичих"
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              submit={submit}
            />
          )}

          {isHost && (
            <ReviewForm
              title="Байр түрээслэгч-д сэтгэгдэл бичих"
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              submit={submit}
            />
          )}

          <ReviewList reviews={reviews} />

        </div>
      </div>
    </AuthenticatedLayout>
  );
}