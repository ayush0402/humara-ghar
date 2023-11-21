import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

// Decline the team invitation.

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.json();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("team_join_invitations")
    .update({ status: "rejected" })
    .eq("invitee_user_id", formData.currentUserId)
    .eq("inviter_user_id", formData.inviterUserId)
    .select();

  if (error) {
    console.error("Error rejecting the invite", error);
    return NextResponse.json(
      { message: "Error rejecting the invite." },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "declined the team invitation." },
    { status: 200 }
  );
}
