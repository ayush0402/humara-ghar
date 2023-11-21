import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import TeamInviteCard from "./team-invite-card";

export default async function CreateTeamDialog() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: roommates } = await supabase
    .from("room_required_listings")
    .select("*");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const currentUser = user?.id || "";

  return (
    <DialogContent className="sm:max-w-[700px] overflow-y-scroll max-h-[600px]">
      <DialogHeader>
        <DialogTitle>Find Teammates</DialogTitle>
        <DialogDescription>
          Send them a request to join their team or create a new one.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4 p-5">
        {roommates &&
          roommates.map((roommate) => {
            // replace with TeamInviteCard
            if (roommate.created_by === currentUser) return null;
            return (
              <TeamInviteCard
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
            );
          })}
      </div>
    </DialogContent>
  );
}
