import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";

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
        receivedInvites.map((invite) => (
          <div
            className="flex flex-row justify-between max-w-[800px]"
            key={invite.id}
          >
            <a
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_ORIGIN_URL}/roommate/${invite.inviter_user_id}`}
              rel="noopener noreferrer"
            >
              <div>{invite.inviter_name}</div>
            </a>

            <div className="flex flex-row gap-2">
              <Button variant="default">Accept</Button>
              <Button variant="destructive">Decline</Button>
            </div>
          </div>
        ))}
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-primary">
        Sent Invites
      </h4>
      {sentInvites &&
        sentInvites.map((invite) => (
          <div
            className="flex flex-row justify-between max-w-[800px]"
            key={invite.id}
          >
            <a
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_ORIGIN_URL}/roommate/${invite.invitee_user_id}`}
              rel="noopener noreferrer"
            >
              <div>{invite.invitee_name}</div>
            </a>
          </div>
        ))}
    </div>
  );
}
