export default function HostCard({ host }) {
  if (!host) return null;

  return (
    <div className="border rounded-2xl p-6 shadow-sm space-y-4">
      
      {/* Top */}
      <div className="flex items-center gap-4">
        <img
          src={host.avatar ?? "/images/avatar.png"}
          className="w-16 h-16 rounded-full object-cover"
        />

        <div>
          <h3 className="text-lg font-semibold">
            Түрээслүүлэгч {host.name}
          </h3>
          <p className="text-sm text-gray-500">
            {host.role?.name} · Joined {new Date(host.created_at).getFullYear()}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-6 text-sm">
        <span>⭐ {host.rating ?? "4.9"}</span>
        <span>💬 {host.reviews?.length ?? 0} reviews</span>
        <span>🏠 {host.listings?.length ?? 0} listings</span>
      </div>

      {/* Bio */}
      <p className="text-gray-700 text-sm leading-relaxed">
        {host.bio ?? "This host hasn't added a bio yet."}
      </p>

      <button className="border rounded-lg px-4 py-2 text-sm hover:bg-gray-100">
        Contact host
      </button>
    </div>
  );
}
