import { usePage, Link } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { format, differenceInCalendarDays } from "date-fns";
import Navbar from "@/Components/Navbar/Navbar";
import { Card, CardContent } from "@/Components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/Components/ui/button";
import {Popover,PopoverContent, PopoverTrigger,} from "@/components/ui/popover";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import ReviewCard from "@/Pages/Host/ReviewCard";

export default function DetailPage() {
  const { listing, host, auth, reviews } = usePage().props;
  const isLoggedIn = !!auth?.user;

  const [selectedImage, setSelectedImage] = useState(0);

  const [date, setDate] = useState({
    from: new Date(),
    to: new Date(),
  });

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, type) => {
    setOptions((prev) => {
      const minValue = name === "adult" || name === "room" ? 1 : 0;
      const newValue = type === "i" ? prev[name] + 1 : prev[name] - 1;

      return {
        ...prev,
        [name]: newValue < minValue ? minValue : newValue,
      };
    });
  };

  const imageUrls = useMemo(() => {
    if (listing?.images?.length > 0) {
      return listing.images.map((img) => `/storage/${img.img_path}`);
    }

    if (listing?.image) {
      return [`/storage/${listing.image}`];
    }

    return [];
  }, [listing]);

  const nights =
    date?.from && date?.to
      ? Math.max(differenceInCalendarDays(date.to, date.from), 1)
      : 1;

  const totalPrice = nights * Number(listing?.price_per_day || 0);

  if (!listing) {
    return <div className="p-6">Байр олдсонгүй</div>;
  }
const avgRating =
  reviews?.length > 0
    ? (
        reviews.reduce((sum, r) => sum + r.rating, 0) /
        reviews.length
      ).toFixed(1)
    : 0;
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl px-4 py-6 mx-auto">
        <h1 className="mb-4 text-3xl font-medium">{listing.title}</h1>

        {imageUrls.length > 0 ? (
          <div className="space-y-4">
            <img
              src={imageUrls[selectedImage]}
              alt={listing.title}
              className="object-cover w-full h-[420px] rounded-2xl"
            />

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {imageUrls.map((img, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`overflow-hidden rounded-xl border-2 ${
                    selectedImage === index ? "border-black" : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${listing.title}-${index}`}
                    className="object-cover w-full h-24"
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-[420px] rounded-2xl bg-gray-100 text-gray-500">
            Зураг байхгүй
          </div>
        )}

        <div className="grid gap-8 mt-8 md:grid-cols-3">
          <div className="space-y-8 md:col-span-2">
            <section>
              <h2 className="text-2xl font-semibold">{listing.description}</h2>
              <p className="mt-3 text-gray-600">
                {listing.guest_number} зочин • {listing.bedrooms} унтлагын өрөө •{" "}
                {listing.bathrooms} угаалгын өрөө
              </p>
            </section>

            <div className="border-b" />
  {/* about host */}
            <section>
              <h2 className="text-xl font-semibold">
                Түрээслүүлэгч {host?.name}
              </h2>

              <div className="flex items-center gap-4 mt-4">
                <img
                  src={
                    host?.avatar
                      ? `/storage/${host.avatar}`
                      : "https://ui-avatars.com/api/?name=" + host?.name
                  }
                  className="w-16 h-16 rounded-full"
                />

                <div>
                  <p className="font-medium">{host?.job || "Мэдээлэл алга"}</p>
                  <p className="text-sm text-gray-500">{host?.language}</p>
                </div>
              </div>

              <p className="mt-4 text-gray-600">
                {host?.bio || "Био байхгүй байна"}
              </p>
            </section>
            <div className="border-b" />

            <section>
              <h2 className="mb-3 text-xl font-medium"> Байрны нэмэлт мэдээлэл үйлчилгээ</h2>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Мэдээлэлтэй танилцах</Button>
                </DialogTrigger>

                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle> Байрны нэмэлт мэдээлэл болон үйлчилгээ.</DialogTitle>
                  </DialogHeader>

                  <div className="max-h-[50vh] overflow-y-auto space-y-3 pr-2">
                    <p>• WiFi</p>
                    <p>• Kitchen</p>
                    <p>• Parking</p>
                    <p>• TV</p>
                    <p>• Hot water</p>
                    <p>• Washing machine</p>
                  </div>
                </DialogContent>
              </Dialog>
            </section>

            <div className="border-b" />

            <section>
              <h2 className="mb-3 text-xl font-medium">Аяллын  хугацаа</h2>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start w-full md:w-auto">
                    {date?.from ? format(date.from, "yyyy-MM-dd") : "Эхлэх өдөр"} -{" "}
                    {date?.to ? format(date.to, "yyyy-MM-dd") : "Дуусах өдөр"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="range"
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </section>
{/* setgegdel heseg */}
       <section>
        <h2 className="text-xl font-semibold">
          {avgRating} · {reviews?.length} сэтгэгдэл
        </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      </section>
          </div>

          <div>
            <Card className="sticky shadow-lg top-6 rounded-2xl">
              <CardContent className="p-6 space-y-5">
                <div className="text-2xl font-bold">
                  {listing.price_per_day}₮
                  <span className="text-sm font-normal text-gray-500"> / шөнө</span>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start w-full">
                      {date?.from ? format(date.from, "yyyy-MM-dd") : "Эхлэх өдөр"} -{" "}
                      {date?.to ? format(date.to, "yyyy-MM-dd") : "Дуусах өдөр"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="range"
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start w-full">
                      {options.adult} Том хүн • {options.children} Хүүхэд • {options.room} Өрөө
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-72 space-y-4">
                    {["adult", "children", "room"].map((item) => (
                      <div key={item} className="flex items-center justify-between">
                        <span className="capitalize">
                          {item === "adult"
                            ? "Том хүн"
                            : item === "children"
                            ? "Хүүхэд"
                            : "Өрөө"}
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={
                              options[item] <=
                              (item === "adult" || item === "room" ? 1 : 0)
                            }
                            onClick={() => handleOption(item, "d")}
                          >
                            −
                          </Button>
                          <span className="w-6 text-center">{options[item]}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOption(item, "i")}
                          >
                          </Button>
                        </div>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>

                <div className="pt-2 space-y-2 text-sm text-gray-600 border-t font-medium">
                  <div className="flex justify-between">
                    <span>
                      {listing.price_per_day}₮ × {nights} шөнө
                    </span>
                    <span>{totalPrice}₮</span>
                  </div>
                  <div className="flex justify-between font-semibold text-black">
                    <span>Нийт</span>
                    <span>{totalPrice}₮</span>
                  </div>
                </div>

                <Link
                  href={route("host.booking", {
                    id: listing.id,
                    from: date?.from ? format(date.from, "yyyy-MM-dd") : "",
                    to: date?.to ? format(date.to, "yyyy-MM-dd") : "",
                    adult: options.adult,
                    children: options.children,
                    room: options.room,
                  })}
                >
                  <Button className="w-full">Захиалах</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}