import { cn } from "@/lib/utils";

import { Menu, Sparkles } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Button } from "./ui/button";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import SearchInput from "./search-input";
import { ModeToggle } from "./mode-toggle";
import AuthButton from "./custom/auth-button";

export const Navbar = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  if (
    user?.email !== "lit2020016@iiitl.ac.in" &&
    user?.email !== "ayushkumar0402@gmail.com"
  ) {
    return (
      <div className="fixed ml-[240px] w-10/12 z-100 flex justify-between items-center py-2 px-4  bg-secondary h-16 mt-0">
        <div className="mr-[800px]"></div>
        <div className="flex mx-2">
          <div>
            <AuthButton />
          </div>
          <ModeToggle />
        </div>
      </div>
    );
  } else {
    return (
      <div className="fixed ml-[240px] w-10/12 z-100 flex justify-between items-center py-2 px-4  bg-secondary h-16 mt-0">
        <div className="mr-[780px]"></div>
        <div className="flex mx-2">
          <div>
            <Link href="/admin">
              <Button className="bg-primary/40">Admin</Button>
            </Link>
          </div>
          <div>
            <AuthButton />
          </div>
          <ModeToggle />
        </div>
      </div>
    );
  }
};
