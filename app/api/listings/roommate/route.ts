import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

// Add listing for roommate required.

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.json();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: supabaseUser } = await supabase.auth.getUser();

  if (supabaseUser.user === null) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Could not authenticate user`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  const { error } = await supabase.from("roommate_required_listings").insert([
    {
      location: formData.location,
      looking_for_gender: formData.gender,
      occupancy: formData.occupancy,
      contact_number: formData.mobile,
      date_available: formData.available_date,
      allow_teams: formData.allow_teams,
      amenities: formData.amenities,
      description: formData.description,
      approx_rent: formData.rent,
    },
  ]);

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/listing?error=Could not save the details`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  // URL to redirect to after onboarding process completes
  return NextResponse.redirect(`${requestUrl.origin}/home`, { status: 301 });
}
