import React from "react";
import { usePage, Link, router } from "@inertiajs/react";
import ListingCard from "../Host/ListingCard";
import DefaultLayout from "@/Layouts/DefaultLayout";
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function Home() {
  const { listings = [], categories = []  } = usePage().props;

  return (
    <div className="px-6 space-y-10">
      {/* filter hiiijiigaa heseg */}
      {categories.map((category) => {
        const categoryListings = listings.filter(
          (listing) => listing.category === category.name
        );

        if (categoryListings.length === 0) return null;

        return (
          <div key={category.id}>

            <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              {category.name}
            </h2>
          <Link href={`/categories/${category.name}`}>
            Цааш харах
          </Link>
          </div>
          <Swiper 
           modules={[Navigation]}
              navigation
              spaceBetween={16}
              slidesPerView={1.2}
              breakpoints={{
                640: {
                  slidesPerView: 2.2,
                },
                768: {
                  slidesPerView: 3.2,
                },
                1024: {
                  slidesPerView: 4.2,
                },
                1280: {
                  slidesPerView: 5.2,
                },
                1536: {
                  slidesPerView: 6.2,
                },
              }}
          >
              {categoryListings.map((listing) => (
                <SwiperSlide key={listing.id}>
                <ListingCard  listing={listing} 
                 review={listing.reviews?.[0]}/>
                </SwiperSlide>
              ))} 
              </Swiper>
          </div>
        );
      })}
    </div>
  );
}

Home.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;