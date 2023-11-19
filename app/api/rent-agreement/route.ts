import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

// Add listing for a shared room required.

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

  const { data, error } = await supabase.from("rent_agreements").insert([
    {
      owner_name: formData.owner_name,
      owner_address: formData.owner_address,
      owner_phone: formData.owner_phone,
      owner_email: formData.owner_email,
      tenant_name: formData.tenant_name,
      tenant_address: formData.tenant_address,
      tenant_phone: formData.tenant_phone,
      tenant_email: formData.tenant_email,
      property_state: formData.property_state,
      property_city: formData.property_city,
      property_pincode: formData.property_pincode,
      property_address: formData.property_address,
      annexure_details: formData.annexure_details,
      monthly_rent: formData.monthly_rent,
      security_deposit: formData.security_deposit,
      lock_in_period: formData.lock_in_period,
      notice_period: formData.notice_period,
      agreement_validity: formData.agreement_validity,
      agreement_start_date: formData.agreement_start_date,
      created_by: formData.created_by,
    },
  ]);

  if (error) {
    console.log(error);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
