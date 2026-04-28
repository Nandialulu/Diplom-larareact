import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { usePage, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import axios from "axios";

export default function Mybooking({ auth }) {
  const [collapsed] = useState(false);
  const { bookings = [] } = usePage().props;

  const bookingList = Array.isArray(bookings) ? bookings : bookings?.data || [];
// chat ehlouuleh 
  const startChat = async (hostId) => {
    if (!hostId) return;

    try {
      const res = await axios.post(`/conversations/start/${hostId}`);
      const conversationId = res.data.id;
      window.location.href = `/chat/${conversationId}`;
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const openReview = (booking) => {
    window.location.href = `/review/${booking.id}`;
  };
  // text hurwuulj baigaa heseg 

  const getBookingStatusText = (booking) => {
    if (booking.booking_status === "pending" && !booking.is_paid) {
      return "Төлбөр хүлээгдэж байна";
    }
    if (booking.booking_status === "pending" && booking.is_paid) {
      return "Баталгаажуулалт хүлээгдэж байна";
    }
    if (booking.booking_status === "confirmed") {
      return "Баталгаажсан";
    }
    if (booking.booking_status === "cancelled") {
      return "Цуцлагдсан";
    }
    if (booking.booking_status === "completed") {
      return "Дууссан";
    }
    return "Тодорхойгүй";
  };

  const getStatusClass = (booking) => {
    if (booking.booking_status === "pending" && !booking.is_paid) {
      return "bg-yellow-100 text-yellow-700";
    }
    if (booking.booking_status === "pending" && booking.is_paid) {
      return "bg-orange-100 text-orange-700";
    }
    if (booking.booking_status === "confirmed") {
      return "bg-green-100 text-green-700";
    }
    if (booking.booking_status === "cancelled") {
      return "bg-red-100 text-red-700";
    }
    if (booking.booking_status === "completed") {
      return "bg-blue-100 text-blue-700";
    }
    return "bg-gray-100 text-gray-700";
  };

  const canStartChat = (booking) => {
    return !!booking.listing?.user_id && booking.booking_status !== "cancelled";
  };
// review bichih
  const canReview = (booking) => {
    const validStatus =
      booking.booking_status === "confirmed" ||
      booking.booking_status === "completed";

    return validStatus;
  };
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("mn-MN");
  };
  const cancelBooking = (booking) => {
    if (!confirm("Та энэ захиалгыг цуцлахдаа итгэлтэй байна уу?")) return;

    router.post(`/guest/bookings/${booking.id}/cancel`, {}, {
      preserveScroll: true,
      onSuccess: () => {
        router.reload({ only: ["bookings"] });
      },
    });
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-medium">Миний захиалга</h2>}
    >
      <div className="flex h-screen bg-gray-100">
        <Sidebar collapsed={collapsed} className="bg-white shadow h-full">
          <Menu className="font-medium">
            <MenuItem>
              <Link href="/">Үндсэн хэсэг</Link>
            </MenuItem>
            <MenuItem>
              <Link href={route("guest.Mybooking")}>Миний захиалга</Link>
            </MenuItem>
            <MenuItem>
              <Link href={route("guest.Review")}>Сэтгэгдэл</Link>
            </MenuItem>
          </Menu>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6 overflow-auto">
            <div className="p-6">
              {bookingList.length === 0 ? (
                <p>Одоогоор захиалга алга.</p>
              ) : (
                <div className="overflow-x-auto rounded-xl border bg-white shadow">
                  <Table>
                    <TableCaption>Таны захиалсан байрны мэдээлэл</TableCaption>

                    <TableHeader>
                      <TableRow>
                        <TableHead>Байр</TableHead>
                        <TableHead>Орох</TableHead>
                        <TableHead>Гарах</TableHead>
                        <TableHead>Нийт үнэ</TableHead>
                        <TableHead>Захиалгын явц</TableHead>
                        <TableHead>Төлбөр</TableHead>
                        <TableHead>Үйлдэл</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {bookingList.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>
                            {booking.listing?.title || "Байргүй"}
                          </TableCell>

                          <TableCell>{formatDate(booking.start_date)}</TableCell>
                          <TableCell>{formatDate(booking.end_date)}</TableCell>

                          <TableCell>
                            {Number(booking.total_price || 0).toLocaleString("mn-MN")}₮
                          </TableCell>

                          <TableCell>
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                                booking
                              )}`}
                            >
                              {getBookingStatusText(booking)}
                            </span>
                          </TableCell>

                          <TableCell>
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                                booking.is_paid
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {booking.is_paid ? "Төлөгдсөн" : "Төлөгдөөгүй"}
                            </span>
                          </TableCell>

                          <TableCell className="min-w-[180px]">
                            <div className="flex flex-col gap-2">
                              {/* setgegdel bichih heseg */}
                              {canReview(booking) && (
                                <button
                                  onClick={() => openReview(booking)}
                                  className="px-3 py-2 rounded text-sm text-white bg-black hover:bg-gray-800"
                                >
                                  Сэтгэгдэл бичих
                                </button>
                              )}
                              <button
                                onClick={() => startChat(booking.listing?.user_id)}
                                disabled={!canStartChat(booking)}
                                className={`px-3 py-2 rounded text-sm text-white ${
                                  canStartChat(booking)
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-gray-300 cursor-not-allowed"
                                }`}
                              >
                                Chat эхлүүлэх
                              </button>
                                {booking.booking_status !== "cancelled" &&
                                  booking.booking_status !== "completed" && (
                                    <button
                                      onClick={() => cancelBooking(booking)}
                                      className="px-3 py-2 rounded text-sm text-white bg-red-600 hover:bg-red-700"
                                    >
                                      Захиалга цуцлах
                                    </button>
                                )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}