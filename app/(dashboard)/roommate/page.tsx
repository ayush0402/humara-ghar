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

  const email = user?.email;

  const { data: userInfo } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email_id", email);

  const { data: rooms } = await supabase
    .from("room_required_listings")
    .select("*");

  const currentUser = userInfo && userInfo[0].user_id;

  return (
    <div className="h-full w-full">
      <div className="flex flex-wrap">
        {!rooms ? (
          <div>No roommates found.</div>
        ) : (
          rooms.map((room) => (
            <RoommateCard
              key={room.listing_id} // assuming each room has a unique id
              imageSrc="https://picsum.photos/200"
              name={room.creator_name}
              location={room.location}
              rentAmount={room.approx_rent}
              lookingForGender={room.looking_for_gender}
              lookingForType="room"
              matchPercentage={80}
              userId={room.created_by}
              currentUserId={currentUser}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RoommatesPage;
