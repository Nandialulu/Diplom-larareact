import {
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@inertiajs/react";

export default function ListingCard({ listing, review }) {
  return (
    <Link
      href={route("detail", listing.id)}
      className="block w-full max-w-[240px]"
    >
      <div className="overflow-hidden rounded-2xl">
        {/* Зураг */}
        <div className="relative">
          <img
            src={
              listing.images?.[0]?.img_path
                ? `/storage/${listing.images[0].img_path}`
                : "/images"
            }
            alt={listing.title}
            className="w-full h-52 object-cover rounded-2xl"
          />

          <Badge
            className="absolute top-2 left-2"
            variant="secondary"
          >
            {listing.status ?? "Active"}
          </Badge>
        </div>

        {/* Мэдээлэл */}
        <CardHeader className="px-1 pt-3">
          <CardTitle className="text-base line-clamp-1">
            {listing.address}
          </CardTitle>

          <CardDescription className="text-sm text-gray-500">
            {listing.bedrooms} ортой · ★ {listing.reviews_avg_rating} ({listing.reviews_count})
          </CardDescription>
        </CardHeader>
      </div>
    </Link>
  );
}