import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { usePage, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

export default function BookingInfo({ auth }) {
  const [collapsed] = useState(false);
  const { bookings = [] } = usePage().props;

  const bookingList = Array.isArray(bookings) ? bookings : bookings?.data || [];

  const handleStatusChange = (bookingId, newStatus) => {
    router.patch(route("host.bookings.updateStatus", bookingId), {
      booking_status: newStatus,
    });
  };

  const startChat = async (guestId) => {
    if (!guestId) return;

    try {
      const res = await axios.post(`/conversations/start/${guestId}`);
      const conversationId = res.data.id;
      window.location.href = `/chat/${conversationId}`;
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("mn-MN");
  };

  const totalGuests = bookingList.reduce(
    (sum, booking) => sum + Number(booking.guest_number || 0),
    0
  );

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-medium">Захиалгын мэдээлэл</h2>}
    >
      <div className="flex h-screen bg-gray-100">
        <Sidebar collapsed={collapsed} className="bg-white shadow h-full">
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

        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6 overflow-auto">
            <div className="p-6">
              {bookingList.length === 0 ? (
                <p>Одоогоор захиалга алга.</p>
              ) : (
                <div className="overflow-x-auto rounded-xl border bg-white shadow">
                  <Table>
                    <TableCaption>Таны байрны захиалгуудын жагсаалт</TableCaption>

                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Байр</TableHead>
                        <TableHead>Захиалагч</TableHead>
                        <TableHead>Ирэх</TableHead>
                        <TableHead>Гарах</TableHead>
                        <TableHead>Хүний тоо</TableHead>
                        <TableHead>Төлөв</TableHead>
                        <TableHead>Үйлдэл</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {bookingList.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">#{booking.id}</TableCell>
                          <TableCell>{booking.listing?.title || "Байргүй"}</TableCell>
                          <TableCell>{booking.user?.name || "Хэрэглэгчгүй"}</TableCell>
                          <TableCell>{formatDate(booking.start_date)}</TableCell>
                          <TableCell>{formatDate(booking.end_date)}</TableCell>
                          <TableCell>{booking.guest_number || 0}</TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  booking.booking_status === "pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : booking.booking_status === "confirmed"
                                    ? "bg-green-100 text-green-700"
                                    : booking.booking_status === "cancelled"
                                    ? "bg-red-100 text-red-700"
                                    : booking.booking_status === "completed"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {booking.booking_status === "pending" && "Хүлээгдэж буй"}
                                {booking.booking_status === "confirmed" && "Баталгаажсан"}
                                {booking.booking_status === "cancelled" && "Цуцлагдсан"}
                                {booking.booking_status === "completed" && "Дууссан"}
                              </span>

                              {booking.booking_status === "pending" && (
                                <div className="flex gap-2">
                                  <button
                                    onClick={() =>
                                      handleStatusChange(booking.id, "confirmed")
                                    }
                                    className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                                  >
                                    Батлах
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleStatusChange(booking.id, "cancelled")
                                    }
                                    className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                                  >
                                    Цуцлах
                                  </button>
                                </div>
                              )}
                            </div>
                          </TableCell>

                          <TableCell className="min-w-[180px]">
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={() => startChat(booking.user?.id)}
                                disabled={!booking.user?.id}
                                className={`px-3 py-1 rounded text-white ${
                                  booking.user?.id
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : "bg-gray-300 cursor-not-allowed"
                                }`}
                              >
                                Chat эхлүүлэх
                              </button>

                              <button
                                onClick={() => router.visit(route("host.Review"))}
                                className="bg-black text-white px-3 py-1 rounded"
                              >
                                Сэтгэгдэл харах
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>

                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={5}>Нийт</TableCell>
                        <TableCell>{totalGuests} хүн</TableCell>
                        <TableCell colSpan={2}>
                          {bookingList.length} захиалга
                        </TableCell>
                      </TableRow>
                    </TableFooter>
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