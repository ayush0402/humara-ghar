import { Navbar } from "@/components/navbar-owner";
import { Sidebar } from "@/components/sidebar";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { NextResponse } from "next/server";
import React from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <div className="min-h-screen bg-secondary w-full">
      <div className="hidden items-start md:flex mt-0 w-200 ml-0 flex-col fixed inset-y-0 h-full ">
        <Sidebar />
        <Navbar />
      </div>
      <main className="mt-[100px] ml-[230px]">{children}</main>
    </div>
  );
};

export default RootLayout;
