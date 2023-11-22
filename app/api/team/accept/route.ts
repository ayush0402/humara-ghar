import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

// Accept the team invitation.

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.json();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  console.log("/accept", formData);
  const { data, error } = await supabase
    .from("team_join_invitations")
    .update({ status: "accepted" })
    .eq("invitee_user_id", formData.inviteeUserId)
    .eq("inviter_user_id", formData.inviterUserId)
    .eq("team_id", formData.teamId)
    .select();

  if (error) {
    console.error("Error accepting the invite", error);
    return NextResponse.json(
      { message: "Error accepting the invite." },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Accepted the team invite." },
    { status: 200 }
  );
}
