import PropertyCard from "@/components/property-card";
import RoomCard from "@/components/custom/room-card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { PlusIcon } from "@radix-ui/react-icons";
import { cookies } from "next/headers";
import Link from "next/link";
import React, { useState } from "react";
import RoommateCard from "@/components/custom/roommate-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    .eq("status", "1");
  //console.log(properties);
  const { data: roommates } = await supabase
    .from("roommate_required_listings")
    .select("*");

  const currentUser = userInfo && userInfo[0].user_id;

  //console.log(currentUser)

  return (
    <div className="space-x-2 space-y-2 flex flex-wrap bg-secondary">
      {/* <div>
        <Select>
          <SelectTrigger className="ml-[25px] w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="room">Room</SelectItem>
            <SelectItem value="roommate">Roommate</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
      <div className="flex flex-wrap">
        <div>
          {properties &&
            properties.map((property) => (
              <RoomCard
                imageSrc="/bed1.png"
                name={property.locality}
                location={property.location}
                rentAmount={property.approx_rent}
                area={property.area}
                bhk={property.bhk}
                bathroom={property.bathroom}
                listing_id={property.listing_id}
                looking_for="Tenant"
                looking_for_gender="Any"
                userId={currentUser}
              />
            ))}
        </div>
        <div>
          {roommates &&
            roommates.map((mates) => (
              <RoomCard
                imageSrc="/bed1.png"
                name={mates.locality}
                location={mates.location}
                rentAmount={mates.approx_rent}
                area={mates.area}
                bhk={mates.bhk}
                bathroom={mates.bathroom}
                listing_id={mates.listing_id}
                looking_for="Roommate"
                looking_for_gender={mates.looking_for_gender}
                userId={mates.created_by}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default page;
