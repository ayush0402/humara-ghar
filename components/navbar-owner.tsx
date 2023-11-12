
import { cn } from "@/lib/utils";

import { Menu , Sparkles} from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Button } from "./ui/button";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import SearchInput from "./search-input";
import {ModeToggle} from "./mode-toggle";
import AuthButton from "./custom/auth-button";




export const Navbar = () => {

    const cookieStore = cookies();

    const canInitSupabaseClient = () => {
      try {
        createClient(cookieStore);
        return true;
      } catch (e) {
        return false;
      }
    };
  
    const isSupabaseConnected = canInitSupabaseClient();
    return (
        <div className="fixed ml-[250px] w-10/12 z-50 flex justify-between items-center py-2 px-4  bg-secondary h-16 mt-2">
            <div className="mr-[850px]">
                <SearchInput/>
            </div>
            <div className="flex">
                <div>
                <AuthButton/>
                </div>
                <ModeToggle/>
            </div>
        </div>
    )
}