import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  // TODO: Add onboarded user details to the database.
  console.log("Request was called", formData);

  // URL to redirect to after onboarding process completes
  return NextResponse.redirect(`${requestUrl.origin}/home`, { status: 301 });
}
