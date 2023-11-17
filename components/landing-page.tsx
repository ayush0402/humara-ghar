import React from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import FooterLanding from "./footer-landing";
import Image from "next/image";
import NavbarLanding from "./navbar-landing";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const LandingPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let redirect='/login';

  if(user){
    redirect='/home';
  }
  return (
    <div className="h-full w-full bg-secondary">
      <NavbarLanding />
      <div className="flex mt-[150px] ml-[150px] items-center">
        <div className="mr-8">
          <Link href="/">
            <div
              className={cn(
                "hidden  md:block text-xl md:text-5xl font-bold ",
                font.className
              )}
            >
              <span className="inline-block text-primary">humara</span>
              <span className="inline-block ml-1">ghar</span>
            </div>
          </Link>
          <div className="text-2xl mt-[5px]">
            perfect way to find your perfect roommates.
          </div>
          <Link href={redirect}>
            <Button
              className={cn(
                "hidden md:block text-xl md:text-base mt-4 hover:bg-primary/95",
                font.className
              )}
            >
              Get Started
            </Button>
          </Link>
        </div>
        <div className="flex-shrink-0">
          <Image
            src="/landing.svg"
            height={250}
            width={600}
            alt=""
            className="ml-[200px]"
          />
        </div>
      </div>
      <div className="mt-[110px]">
        <FooterLanding />
      </div>
    </div>
  );
};

export default LandingPage;
