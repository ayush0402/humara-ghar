import RoommateCard from "@/components/custom/roommate-card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { AiOutlinePlus } from "react-icons/ai";

// revalidates the page after every
export const revalidate = 60;

const RoomsPage = async () => {
  // contains listings under roommate-requiered table.
  // == listings of shared rooms.
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: rooms } = await supabase
    .from("roommate_required_listings")
    .select("*");
  return (
    <div className="h-full w-full">
      <div className="flex flex-wrap">
        {!rooms ? (
          <div>No rooms found.</div>
        ) : (
          rooms.map((room) => (
            <RoommateCard
              key={room.listing_id} // assuming each room has a unique id
              imageSrc="https://picsum.photos/200"
              name={room.creator_name}
              location={room.location}
              rentAmount={room.approx_rent}
              lookingForGender={room.looking_for_gender}
              lookingForType="roommate"
              matchPercentage={80}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RoomsPage;
