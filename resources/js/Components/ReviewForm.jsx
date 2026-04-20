import { Star } from "lucide-react";

export default function ReviewForm({
  title,
  rating,
  setRating,
  comment,
  setComment,
  submit,
}) {
  return (
    <div className="max-w-2xl p-6 border shadow-sm bg-white/80 backdrop-blur-xl rounded-3xl border-gray-100">
      <div className="mb-5">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900">
          {title}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Өөрийн сэтгэгдлээ соёлтой, ойлгомжтой байдлаар бичнэ үү.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-5">
        {/* Rating */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Үнэлгээ
          </label>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => {
              const active = star <= rating;

              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`group rounded-full p-2 transition-all duration-200 ${
                    active
                      ? "bg-amber-50 shadow-sm"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Star
                    className={`h-6 w-6 transition-all ${
                      active
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300 group-hover:text-amber-300"
                    }`}
                  />
                </button>
              );
            })}

            <span className="ml-2 text-sm text-gray-500">
              {rating}/5 үнэлгээ
            </span>
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Сэтгэгдэл
          </label>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            placeholder="Таны туршлага ямар байсан бэ?"
            className="w-full px-4 py-3 text-sm text-gray-700 placeholder-gray-400 transition bg-white border border-gray-200 resize-none rounded-2xl outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-3 text-sm font-medium text-white transition-all bg-black shadow-sm rounded-2xl hover:bg-gray-900 active:scale-[0.98]"
          >
            Сэтгэгдэл илгээх
          </button>
        </div>
      </form>
    </div>
  );
}