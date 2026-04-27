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

  // login user
  const userId = auth.id;

  // role check
  const isGuest = userId === booking.user_id;
  const isHost = userId === booking.listing.host?.id;

  const submit = (e) => {
    e.preventDefault();

    router.post(route("reviews.store"), {
      listing_id: booking.listing.id,
      booking_id: booking.id,
      rating,
      comment,
      type: isHost ? "host_to_guest" : "guest_to_host",
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="flex h-screen bg-gray-100">

        {/* Sidebar */}
       {isHost ? (
        <Sidebar className="bg-white shadow h-full">
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
      ) : (
        <Sidebar className="bg-white shadow h-full">
          <Menu>
            <MenuItem>
              <Link href="/">Үндсэн мэдээлэл</Link>
            </MenuItem>
            <MenuItem>
              <Link href={route("guest.Mybooking")}>Миний захиалга</Link>
            </MenuItem>
            <MenuItem>
              <Link href={route("guest.Review")}>Сэтгэгдэл</Link>
            </MenuItem>
          </Menu>
        </Sidebar>
      )}
        {/* Content */}
        <div className="flex-1 p-6 space-y-6 font-medium">

          {isGuest && (
            <ReviewForm
              title="Түрээслэгчид сэтгэгдэл бичих"
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              submit={submit}
            />
          )}

          {isHost && (
            <ReviewForm
              title="Түрээслүүлэгчид сэтгэгдэл бичих"
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