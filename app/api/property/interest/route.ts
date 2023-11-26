import { createClient } from "@/utils/supabase/server";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: supabaseUser } = await supabase.auth.getUser();

  const { data: teamInfo } = await supabase
    .from("team_members")
    .select("*")
    .eq("user_id", supabaseUser.user?.id);
  //console.log(teamInfo);

  if (req.method === "POST") {
    const { propertyId, interestType } = await req.json();
    try {
      if (interestType == "Solo") {
        const { data, error } = await supabase
          .from("property_requests")
          .insert([
            {
              property_id: propertyId,
              type: "Solo",
              team_user_id: supabaseUser.user?.id,
            },
          ]);
      } else {
        if (!teamInfo || !teamInfo[0]) {
          console.error("Error adding interest to the database:");
          return NextResponse.json(
            { error: "No team present" },
            {
              status: 422,
            }
          );
        }
        else {
        const { data, error } = await supabase
          .from("property_requests")
          .insert([
            {
              property_id: propertyId,
              type: "Team",
              team_user_id: teamInfo && teamInfo[0].team_id,
            },
          ]);
      }
    }

      return NextResponse.json(
        { message: "Interest added successfully" },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error("Error adding interest to the database:", error);
      return NextResponse.json(
        { error: "Method Not Allowed" },
        {
          status: 405,
        }
      );
    } finally {
    }
  } else {
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
