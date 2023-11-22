import RoommateCard from "@/components/custom/roommate-card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { AiOutlinePlus } from "react-icons/ai";

const RoommatesPage = async () => {
  // contains listings under room-required table.
  // == listings of roommates.
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: roommates } = await supabase
    .from("room_required_listings")
    .select("*");

  const currentUser = user?.id || "";

  return (
    <div className="h-full w-full">
      <div className="flex flex-wrap">
        {!roommates ? (
          <div>No roommates found.</div>
        ) : (
          roommates.map((roommate) => (
            <RoommateCard
              key={roommate.listing_id} // assuming each room has a unique id
              imageSrc="https://picsum.photos/200"
              name={roommate.creator_name}
              location={roommate.location}
              rentAmount={roommate.approx_rent}
              lookingForGender={roommate.looking_for_gender}
              lookingForType="room"
              matchPercentage={80}
              userId={roommate.created_by}
              currentUserId={currentUser}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RoommatesPage;
