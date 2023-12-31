import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { buttonVariants } from "@/components/ui/button";
import { Hand } from "lucide-react";

const NavbarLanding = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", user?.id);

  return user ? (
    <div className="flex justify-end p-4">
      <Link href="/profile" className={buttonVariants({ variant: "ghost" })}>
        Hey, {data && data[0].name} !
      </Link>
      <form action="/api/auth/sign-out" method="post">
        <Button>Log out</Button>
      </form>
      <ModeToggle />
    </div>
  ) : (
    <div className="flex justify-end p-4">
      <Link href="/login">
        <Button className="mr-2" variant="outline">
          Register
        </Button>
      </Link>
      <Link href="/login">
        <Button className="mr-2">Login</Button>
      </Link>
      <ModeToggle />
    </div>
  );
};

export default NavbarLanding;
