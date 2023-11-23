"use client";
import { Button } from "@/components/ui/button";

interface TeamInviteActionCardProps {
  id: string;
  inviter_user_id: string;
  invitee_user_id: string;
  team_id: string;
  inviter_name: string;
  invitee_name: string;
}

export default function TeamInviteActionCard({
  id,
  inviter_user_id,
  invitee_user_id,
  team_id,
  inviter_name,
  invitee_name,
}: TeamInviteActionCardProps) {
  const handleOnClickAccept =
    (inviterUserId: string, inviteeUserId: string, teamId: string) =>
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      // Your click handling logic here
      try {
        const response = await fetch("/api/team/accept", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inviterUserId: inviterUserId,
            inviteeUserId: inviteeUserId,
            teamId: teamId,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

  const handleOnClickDecline =
    (inviterUserId: string, inviteeUserId: string, teamId: string) =>
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      // Your click handling logic here
      try {
        const response = await fetch("/api/team/decline", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inviterUserId: inviterUserId,
            inviteeUserId: inviteeUserId,
            teamId: teamId,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

  return (
    <div
      className="flex flex-row justify-between max-w-[800px] items-center"
      key={id}
    >
      <a
        target="_blank"
        href={`${process.env.NEXT_PUBLIC_ORIGIN_URL}/roommate/${inviter_user_id}`}
        rel="noopener noreferrer"
      >
        <div>{inviter_name}</div>
      </a>

      <div className="flex flex-row gap-2">
        <Button
          variant="default"
          onClick={handleOnClickAccept(
            inviter_user_id,
            invitee_user_id,
            team_id
          )}
        >
          Accept
        </Button>
        <Button
          variant="destructive"
          onClick={handleOnClickDecline(
            inviter_user_id,
            invitee_user_id,
            team_id
          )}
        >
          Decline
        </Button>
      </div>
    </div>
  );
}
