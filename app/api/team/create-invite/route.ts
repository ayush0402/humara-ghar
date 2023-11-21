import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.json();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  console.log("formData", formData);

  const { data: inviterTeamData, error: inviterTeamError } = await supabase
    .from("team_members")
    .select("team_id")
    .eq("user_id", formData.currentUserId)
    .single();

  if (inviterTeamData === null) {
    // create a new team
    const { data, error } = await supabase
      .from("team_join_invitations")
      .insert([
        {
          inviter_user_id: formData.currentUserId,
          status: "waiting",
          invitee_user_id: formData.userId,
        },
      ]);
    return NextResponse.json(
      { error: "Team created and invitation sent." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase.from("team_join_invitations").insert([
    {
      inviter_user_id: formData.currentUserId,
      status: "waiting",
      invitee_user_id: formData.userId,
      team_id: inviterTeamData.team_id,
    },
  ]);

  return NextResponse.json(
    { message: "Invite sent for existing team." },
    { status: 200 }
  );
}
