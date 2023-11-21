import PropertyCard from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { PlusIcon } from "@radix-ui/react-icons";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

const page = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.email;

  const { data: userInfo } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email_id", email);

  const { data: properties } = await supabase
    .from("property_listings")
    .select("*")
    .eq("created_by", userInfo && userInfo[0].user_id);

  //console.log(properties);

  return (
    <div className="space-x-4 space-y-2">
      <div className="flex flex-wrap">
        {properties &&
          properties.map((property) => (
            <PropertyCard
              imageSrc="https://picsum.photos/200"
              name={property.locality}
              location={property.location}
              rentAmount={property.approx_rent}
              area={property.area}
              bhk={property.bhk}
              bathroom={property.bathroom}
              listing_id={property.listing_id}
              status={property.status}
            />
          ))}
      </div>
    </div>
  );
};

export default page;
