import RoomCard from "@/components/custom/room-card";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: properties } = await supabase
    .from("property_listings")
    .select("*")
    .eq("status", "1");

  return (
    <div className="space-x-4 space-y-2">
      <div className="flex flex-wrap">
        {properties &&
          properties.map((property) => (
            <RoomCard
              imageSrc="https://picsum.photos/200"
              name={property.locality}
              location={property.location}
              rentAmount={property.approx_rent}
              area={property.area}
              bhk={property.bhk}
              bathroom={property.bathroom}
              listing_id={property.listing_id}
            />
          ))}
      </div>
    </div>
  );
};

export default page;
