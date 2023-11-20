import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import RoommateCard from "./roommate-card";

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
    <DialogContent className="sm:max-w-[825px] overflow-y-scroll max-h-[600px]">
      <DialogHeader>
        <DialogTitle>Find Teammates</DialogTitle>
        <DialogDescription>
          Send them a request to join their team or create a new one.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="space-x-4 space-y-2">
            <div className="flex flex-wrap">
              {roommates &&
                roommates.map((roommate) => (
                  // replace with TeamInviteCard
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
                ))}
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
}
