import ReviewCard from "./ReviewCard";

export default function ReviewList({ reviews }) {
  return (
    <div className="border p-4 rounded-xl">
      <h2 className="text-xl font-bold mb-3">Нийтлэгдсэн сэтгэгдлүүд</h2>

      {reviews.length === 0 && (
        <p className="text-gray-500">Одоогоор сэтгэгдэл байхгүй</p>
      )}

      {reviews.map((r) => (
        <ReviewCard key={r.id} r={r} />
      ))}
    </div>
  );
}