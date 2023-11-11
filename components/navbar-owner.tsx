"use client";

import { cn } from "@/lib/utils";

import { Menu , Sparkles} from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Button } from "./ui/button";
import SearchInput from "./search-input";




export const Navbar = () => {
    return (
        <div className="fixed ml-[250px] w-10/12 z-50 flex justify-between items-center py-2 px-4  bg-secondary h-16 mt-2">
            <div className="mr-[850px]">
                <SearchInput/>
            </div>
        </div>
    )
}