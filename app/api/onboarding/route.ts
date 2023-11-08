import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.json();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: supabaseUser } = await supabase.auth.getUser();

  if (supabaseUser.user === null) {
    console.log("POST /api/onboarding: user is null");
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Could not authenticate user`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  const { error } = await supabase.from("user_profiles").insert([
    {
      name: formData.name,
      email_id: supabaseUser.user.email,
      user_type: formData.user_type,
      gender: formData.gender,
      dob: formData.dob,
    },
  ]);

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/onboarding?error=Could not save the details`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  if (formData.user_type === "renter") {
    return NextResponse.redirect(
      `${requestUrl.origin}/onboarding/preferences`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }
  // URL to redirect to after onboarding process completes
  return NextResponse.redirect(`${requestUrl.origin}/home`, { status: 301 });
}
