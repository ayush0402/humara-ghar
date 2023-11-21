import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const revalidate = 60;

export default async function WaitingTeamInvites({
  userId,
}: {
  userId: string;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("team_join_invitations")
    .select("*")
    .eq("invitee_user_id", userId)
    .eq("status", "waiting");

  console.log("invites", data);
  // continue here
  return (
    <>
      <div>Pending Invites</div>
    </>
  );
}
