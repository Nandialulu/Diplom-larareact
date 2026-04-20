import { usePage, useForm, router } from "@inertiajs/react";
import { differenceInCalendarDays, parseISO, addDays, format } from "date-fns";
import Navbar from "@/Components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import {Card,CardContent,} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
export default function Checkout() {
  const { listing, from, to, adult } = usePage().props;
  const checkIn = parseISO(from);
  let checkOut = parseISO(to);

  if (differenceInCalendarDays(checkOut, checkIn) < 1) {
    checkOut = addDays(checkIn, 1);
  }

  const nights = differenceInCalendarDays(checkOut, checkIn);
  const totalPrice = nights * listing.price_per_day;

  const { data, setData, post, processing, errors } = useForm({
    from: format(checkIn, "yyyy-MM-dd"),
    to: format(checkOut, "yyyy-MM-dd"),
    adult: adult ?? 1,
    payment_method: "cash",
    message_to_host: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("booking.store", listing.id));
  };
  const handlePayment = (bookingId) => {
  router.post(route("payments.pay", bookingId));
};
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <form onSubmit={submit} className="max-w-7xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-semibold text-slate-900">
          Захиалгаа баталгаажуулах
        </h1>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section>
              <h2 className="mb-4 text-xl font-semibold">Таны аяллын мэдээлэл</h2>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Огноо</p>
                    <p className="text-sm text-slate-600">
                      {format(checkIn, "yyyy-MM-dd")} — {format(checkOut, "yyyy-MM-dd")}
                    </p>
                  </div>
                  <button type="button" className="text-sm font-medium underline">
                    Засах
                  </button>
                </div>

                <Separator />

                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Зочид</p>
                    <p className="text-sm text-slate-600">{adult} guest</p>
                  </div>
                  <button type="button" className="text-sm font-medium underline">
                    Засах
                  </button>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold">Төлбөрийн хэлбэр</h2>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 transition border rounded-2xl cursor-pointer hover:border-slate-400">
                  <div>
                    <p className="font-medium">Бэлнээр</p>
                    <p className="text-sm text-slate-500">Очоод төлөх</p>
                  </div>
                  <input
                    type="radio"
                    name="payment_method"
                    value="cash"
                    checked={data.payment_method === "cash"}
                    onChange={(e) => setData("payment_method", e.target.value)}
                  />
                </label>

                <label className="flex items-center justify-between p-4 transition border rounded-2xl cursor-pointer hover:border-slate-400">
                  <div>
                    <p className="font-medium">Картаар</p>
                    <p className="text-sm text-slate-500">Онлайнаар төлөх</p>
                  </div>
                  <input
                    type="radio"
                    name="payment_method"
                    value="card"
                    checked={data.payment_method === "card"}
                    onChange={(e) => setData("payment_method", e.target.value)}
                  />
                </label>
              </div>

              {errors.payment_method && (
                <p className="mt-2 text-sm text-red-500">{errors.payment_method}</p>
              )}
            </section>

            <Separator />

            <section>
              <h2 className="mb-2 text-xl font-semibold">Түрээслүүлэгчид мессеж үлдээх</h2>
              <p className="mb-4 text-sm text-slate-500">
                Ирэх цаг, тусгай хүсэлт зэрэг мэдээллээ энд үлдээгээрэй.
              </p>

              <Textarea
                id="message_to_host"
                value={data.message_to_host}
                onChange={(e) => setData("message_to_host", e.target.value)}
                placeholder="Сайн байна уу, бид оройн 8 цагийн үед очих байх. Check-in боломжтой юу?"
                className="min-h-[120px] rounded-2xl"
              />

              {errors.message_to_host && (
                <p className="mt-2 text-sm text-red-500">{errors.message_to_host}</p>
              )}
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold">Баталгаажуулахын өмнө</h2>
              <ul className="space-y-3 text-sm list-disc list-inside text-slate-600">
                <li>House rules-ийг уншиж зөвшөөрсөн байна.</li>
                <li>Захиалгын хугацаа болон зочдын тоо зөв эсэхээ шалгана уу.</li>
                <li>Төлбөрийн нөхцөлтэй танилцсан байна.</li>
              </ul>
            </section>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky border shadow-lg top-24 rounded-3xl">
              <CardContent className="p-6">
                <div className="flex gap-4 pb-5">
                  <img
                     src={
                          listing.images?.[0]?.img_path
                          ? `/storage/${listing.images[0].img_path}`
                          : "/images/no-image.png"
                        }
                    className="object-cover w-28 h-24 rounded-2xl"
                  />

                  <div className="flex-1">
                    <p className="text-sm text-slate-500">Entire rental unit</p>
                    <h3 className="font-semibold leading-snug line-clamp-2">
                      {listing.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      ★ {listing.rating ?? "4.9"} · {listing.review_count ?? "0"} reviews
                    </p>
                  </div>
                </div>

                <Separator className="my-5" />

                <div className="mb-4">
                  <h4 className="mb-4 text-lg font-semibold">Үнэний дэлгэрэнгүй</h4>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>{listing.price_per_day}₮ × {nights} шөнө</span>
                      <span>{totalPrice}₮</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Үйлчилгээний шимтгэл</span>
                      <span>0₮</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-5" />

                <div className="flex justify-between text-base font-semibold">
                  <span>Нийт</span>
                  <span>{totalPrice}₮</span>
                </div>

                {errors.date && (
                  <p className="mt-3 text-sm text-red-500">{errors.date}</p>
                )}

              <Button
              type="submit"
              disabled={processing}
              className="w-full mt-6 h-12 rounded-2xl text-base"
            >
              {processing
                ? "Түр хүлээнэ үү..."
                : data.payment_method === "card"
                ? "Төлбөр рүү үргэлжлүүлэх"
                : "Захиалга баталгаажуулах"}
            </Button>

                <p className="mt-3 text-xs text-center text-slate-500">
                  Баталгаажуулсны дараа таны захиалга хадгалагдана.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}