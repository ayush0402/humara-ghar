import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import TeamInviteActionCard from "./team-invite-action-card";

const revalidate = 60;

export default async function WaitingTeamInvites({
  userId,
}: {
  userId: string;
}) {
  

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: receivedInvites } = await supabase
    .from("team_join_invitations")
    .select("*")
    .eq("invitee_user_id", userId)
    .eq("status", "waiting");

  const { data: sentInvites } = await supabase
    .from("team_join_invitations")
    .select("*")
    .eq("inviter_user_id", userId)
    .eq("status", "waiting");

  // continue here
  return (
    <div className="flex flex-col gap-4 m-5">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-primary">
        Received Invites
      </h4>
      {receivedInvites &&
        receivedInvites.map((invite) => <TeamInviteActionCard {...invite} />)}
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-primary">
        Sent Invites
      </h4>
      {sentInvites &&
        sentInvites.map((invite) => (
          <div
            className="flex flex-row justify-between max-w-[800px] items-center"
            key={invite.id}
          >
            <a
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_ORIGIN_URL}/roommate/${invite.invitee_user_id}`}
              rel="noopener noreferrer"
            >
              <div>{invite.invitee_name}</div>
            </a>
            <p className="leading-7">Waiting</p>
          </div>
        ))}
    </div>
  );
}
