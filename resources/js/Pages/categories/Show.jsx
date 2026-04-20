import React from "react";
import { usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import ListingCard from "@/Pages/Host/ListingCard";

export default function Show() {
  const { category, listings } = usePage().props;

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <h1 className="text-xl font-bold mb-4">
          {category}
        </h1>

        <div className="w-1/2 overflow-y-scroll p-6 grid grid-cols-2 gap-6">
          {listings.map((item) => (
            <ListingCard key={item.id}  listing={item} />
          ))}
        </div>

        <div className="w-1/2">
          <iframe
            className="w-full h-full rounded-xl"
            loading="lazy"
            src="https://maps.google.com/maps?q=ulaanbaatar&t=&z=13&ie=UTF8&iwloc=&output=embed"
          />
        </div>
      </div>
    </div>
  );
}