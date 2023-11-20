import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  console.log("supabase.auth.getUser()");
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  console.log(user);

  if (error) {
    return NextResponse.json(
      { error: "Error fetching user details" },
      { status: 500 }
    );
  }

  const userId = user?.id;

  const { data: teamData, error: teamError } = await supabase
    .from("team_members")
    .select("team_id")
    .eq("user_id", userId)
    .single();

  if (teamError) {
    return NextResponse.json(
      { error: "Error fetching team details" },
      { status: 500 }
    );
  }

  if (teamData === null) {
    return NextResponse.json({ team_status: false }, { status: 200 });
  }

  return NextResponse.json(
    { team_status: true, team_id: teamData.team_id },
    { status: 200 }
  );
}
