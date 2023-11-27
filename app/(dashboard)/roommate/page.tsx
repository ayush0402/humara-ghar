import RoommateCard from "@/components/custom/roommate-card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { AiOutlinePlus } from "react-icons/ai";
import UserCard from "@/components/custom/user-card";

const RoommatesPage = async () => {
  // contains listings under room-required table.
  // == listings of roommates.
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: room_req } = await supabase
    .from("room_required_listings")
    .select("*");
    const { data: roommates } = await supabase
    .from("roommate_required_listings")
    .select("*");
  const currentUser = user?.id || "";

  return (
    <div className="min-h-screen bg-secondary flex flex-wrap">
      <div className="flex flex-wrap">
        {!room_req ? (
          <div>No roommates found.</div>
        ) : (
          room_req.map((roommate) => (
            <UserCard
               // assuming each room has a unique id
              ImageSrc="https://picsum.photos/200"
              Id={roommate.created_by}
            />
          ))
        )}
        {roommates &&
            roommates.map((mates) => (
              <RoommateCard
                name={mates.creator_name}
                imageSrc="https://picsum.photos/200"
                location={mates.location}
                rentAmount={mates.approx_rent}
                lookingForGender={mates.looking_for_gender}
                lookingForType={mates.looking_for_type}
                matchPercentage={80}
                userId={mates.created_by}
                currentUserId={currentUser}
              />
            ))}
      </div>
    </div>
  );
};

export default RoommatesPage;
