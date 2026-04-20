export default function ReviewCard({ r }) {
  return (
    <div className="border-b py-4 flex gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-300" />

      <div>
        <div className="font-semibold">{r.user?.name}</div>

        <div className="text-yellow-500">
          {"★".repeat(r.rating)}
        </div>

        <p className="text-gray-600">{r.comment}</p>
      </div>
    </div>
  );
}