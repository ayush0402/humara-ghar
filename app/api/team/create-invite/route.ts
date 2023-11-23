import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.json();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  console.log("formData at create-invite", formData);

  // Checking if a team exists for the current user
  const { data: inviterTeamData, error: inviterTeamError } = await supabase
    .from("team_members")
    .select("team_id")
    .eq("user_id", formData.currentUserId)
    .single();

  let teamId = "";

  if (inviterTeamData === null) {
    // creating a new team when not already exists
    const { data: teamMembersData, error: teamMembersError } = await supabase
      .from("team_members")
      .insert([
        {
          user_id: formData.currentUserId,
        },
      ])
      .select();

    if (teamMembersError) {
      return NextResponse.json(
        { error: teamMembersError.message },
        { status: 400 }
      );
    }
    if (teamMembersData) teamId = teamMembersData[0].team_id;
  } else {
    teamId = inviterTeamData.team_id;
  }

  // Checking if the invite already exists
  const { data: inviteExists, error: inviteExistsError } = await supabase
    .from("team_join_invitations")
    .select("*")
    .eq("invitee_user_id", formData.userId)
    .eq("team_id", teamId)
    .eq("inviter_user_id", formData.currentUserId)
    .eq("status", "waiting")
    .single();

  if (inviteExists) {
    return NextResponse.json(
      { message: "Invite already exists." },
      { status: 200 }
    );
  }

  // Creating the join invite entry with the team id
  const { data, error } = await supabase.from("team_join_invitations").insert([
    {
      inviter_user_id: formData.currentUserId,
      status: "waiting",
      invitee_user_id: formData.userId,
      team_id: teamId,
      invitee_name: formData.invitee_name,
      inviter_name: formData.inviter_name,
    },
  ]);

  if (error) {
    return NextResponse.json({ error: "Error saving invite" }, { status: 400 });
  }

  return NextResponse.json(
    { message: "Invite sent for existing team." },
    { status: 200 }
  );
}
