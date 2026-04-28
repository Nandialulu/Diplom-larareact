import { Card, CardContent } from "@/Components/ui/card";
import { Star } from "lucide-react";

export default function ReviewCard({ review }) {

  const userName = review?.user?.name || "Нэргүй";

  const avatar = review?.user?.avatar
    ? `/storage/${review.user.avatar}`
    : "/default-avatar.png";

  const rating = Number(review?.rating || 0);
  const fullStars = Math.floor(rating);

  // role todorhoiloh
  const roleText =
    review?.type === "guest_to_host"
      ? "Зочин"
      : review?.type === "host_to_guest"
      ? "Түрээслүүлэгч"
      : "";

  // date jin sar udruur review uusen udur
  const createdDate = review?.created_at
    ? new Date(review.created_at).toLocaleDateString("mn-MN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <Card className="border border-gray-200 rounded-2xl shadow-none hover:shadow-md transition-all duration-300 bg-white">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={avatar}
              alt={userName}
              className="w-12 h-12 rounded-full object-cover border border-gray-200"
            />

            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                {userName}
              </h4>

              {/* role duudaj uguh */}
              <p className="text-xs text-gray-500">{roleText}</p>

              {/* rating */}
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={14}
                    className={`${
                      index < fullStars
                        ? "fill-black text-black"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-1 text-sm font-medium text-gray-800">
                  {rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* on sar */}
          {createdDate && (
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {createdDate}
            </span>
          )}
        </div>

        {/* setgegdel */}
        <p className="mt-4 text-[15px] leading-6 text-gray-700">
          {review?.comment}
        </p>
      </CardContent>
    </Card>
  );
}