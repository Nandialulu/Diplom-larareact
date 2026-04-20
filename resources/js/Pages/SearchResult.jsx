import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import ListingCard from "./Host/ListingCard";
import Map from "@/Components/Map";
import Navbar from "@/Components/Navbar/Navbar";
export default function SearchResult() {
  // data ashiglah
  const { listings } = usePage().props;
  const [selectedId, setSelectedId] = useState(null);

  const markers = listings.data.map((l) => ({
    id: l.id,
    lat: Number(l.lat),
    lng: Number(l.lng),
    title: l.title
  }));

  const handleMarkerClick = (id) => {
    setSelectedId(id);
    const el = document.getElementById(`listing-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
 return (
  <div >
    <Navbar/>

    {/* Tailbar */}
    <div className="px-6 py-4">
      Нийт{" "}
      <span className="font-semibold text-slate-800">
        {listings.data.length}
      </span>{" "}
      байр олдлоо
    </div>

    {/* Content */}
    <div className="flex h-[calc(100vh-140px)]">
      {/* LEFT - Listings */}
      <div className="w-1/2 overflow-y-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.data.map((listing) => (
            <div
              key={listing.id}
              id={`listing-${listing.id}`}
              className={
                selectedId === listing.id
                  ? "border-2 border-black rounded-xl shadow-lg"
                  : ""
              }
            >
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT - Map */}
      <div className="w-1/2 border-l border-slate-200">
        <Map
          markers={markers}
          selectedId={selectedId}
          onMarkerClick={handleMarkerClick}
        />
      </div>
    </div>
  </div>
);
}
