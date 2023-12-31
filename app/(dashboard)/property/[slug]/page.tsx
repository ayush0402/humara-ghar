import { FC } from "react";
import { notFound } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import ChatHeader from "@/components/custom/chat-header";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import PropertyDisplay from "@/components/custom/property-display";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = async ({ params }: { params: { slug: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const propertyId = params.slug;
  //console.log(propertyId)
  const { data: properties } = await supabase
    .from("property_listings")
    .select("*")
    .eq("listing_id", propertyId);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const id = user?.id;
  const id1 = properties && properties[0].created_by;

  return (
    <div className="ml-[10px] flex justify-between">
      <div>
        <PropertyDisplay
          imageSrc="https://picsum.photos/200"
          location={properties && properties[0].location}
          locality={properties && properties[0].locality}
          area={properties && properties[0].area}
          bhk={properties && properties[0].bhk}
          bathroom={properties && properties[0].bathroom}
          rentAmount={properties && properties[0].approx_rent}
          address={properties && properties[0].address}
          userId={properties && properties[0].created_by}
          occupancy={properties && properties[0].occupancy}
          amenities={properties && properties[0].amenities}
          requests={id === id1}
          propertyId={propertyId}
        />
      </div>
    </div>
  );
};

export default Page;
