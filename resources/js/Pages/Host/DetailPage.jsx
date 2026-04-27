import { usePage, Link } from "@inertiajs/react";
import { useMemo, useState } from "react";
import Navbar from "@/Components/Navbar/Navbar";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import AvailableTime from "./AvailableTime";
import ReviewCard from "./ReviewCard";

export default function DetailPage() {
  const { listing, host} = usePage().props;

  const [selectedImage, setSelectedImage] = useState(0);

  const [date, setDate] = useState({
    from: undefined,
    to: undefined,
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

  if (!listing) {
    return <div className="p-6">Байр олдсонгүй</div>;
  }
const reviews = listing.reviews || [];
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : 0;
  const fullStars = Math.floor(avgRating);
  // backend-ээс ирэх захиалгатай өдрүүд
  // жишээ: ["2026-04-21", "2026-04-22", "2026-04-28"]
  const bookedDates = listing?.booked_dates || [];
console.log("listing", listing);
console.log("booked_dates", listing?.booked_dates);
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-6xl px-4 py-6 mx-auto">
        {/* байршилаар авах засах */}
        <h1 className="mb-4 text-2xl font-medium">{listing.title}</h1>

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
              {/* <h2 className="text-2xl font-semibold">{listing.description}</h2> */}
              <p className="mt-3 text-gray-600">
                {listing.guest_number} зочин • {listing.bedrooms} унтлагын өрөө •{" "}
                {listing.bathrooms} угаалгын өрөө
              </p>
            </section>

            <div className="border-b" />

            <section>
              <h2 className="text-xl font-semibold">
                Түрээслүүлэгч {host?.name}
              </h2>

              <div className="flex items-center gap-4 mt-4">
                <img
                  src={
                    host?.avatar
                      ? `/storage/${host.avatar}`
                      : `https://ui-avatars.com/api/?name=${host?.name || "Host"}`
                  }
                  alt={host?.name}
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
              <h2 className="mb-3 text-xl font-medium">
                Байрны нэмэлт мэдээлэл үйлчилгээ
              </h2>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Мэдээлэлтэй танилцах</Button>
                </DialogTrigger>

                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>
                      Байрны нэмэлт мэдээлэл болон үйлчилгээ
                    </DialogTitle>
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
            <div className="border-b" />
            {/* Reviewcard import hiih zasah */}
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>Сэтгэгдэл ({reviews.length})</span>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={14}
                      className={`${
                        index < fullStars ? "fill-black text-black" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm font-medium ml-1">{avgRating}</span>
                </div>
              </h2>

              {reviews.length === 0 ? (
                <p className="text-gray-500">Сэтгэгдэл байхгүй байна</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              )}
            </section>
          </div>
          <div>

            {/* bolomjtoi hongiig haruulah */}
            <CardContent className="p-6 space-y-5">
             <AvailableTime
                listing={listing}
                date={date}
                setDate={setDate}
                bookedDates={bookedDates}
                pricePerDay={listing.price_per_day}
                options={options}
                setOptions={setOptions}
              />
              </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
}