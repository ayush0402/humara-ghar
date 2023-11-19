import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Building, Contact2, PlusIcon } from "lucide-react";
import Link from "next/link";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const DashboardHome = () => {
  return (
    <div className="w-full h-full  ">
      <div className={cn("text-2xl ml-[20px]", font.className)}>
        Welcome to humaraghar!
      </div>
      <div className={cn("text-2xl my-2 ml-[20px]", font.className)}>
        let's get started
      </div>
      <div className="flex flex-wrap mt-[100px] mx-2 ml-[20px]">
        <div>
          <Link href="/room">
            <Button
              variant="outline"
              className={cn(
                "h-[350px] mx-4 w-[350px] text-lg bg-primary/10 hover:bg-primary/20 rounded flex-col justify-evenly  text-muted-foreground",
                font.className
              )}
            >
              <Building className="h-10 w-10" />
              Find a room
            </Button>
          </Link>
        </div>
        <div>
          <Link href="/roommate">
            <Button
              variant="secondary"
              className={cn(
                "h-[350px] mx-4 w-[350px] text-lg bg-primary/10 hover:bg-primary/20 rounded flex-col justify-evenly  text-muted-foreground",
                font.className
              )}
            >
              <Contact2 className="h-10 w-10" />
              Find a roommate
            </Button>
          </Link>
        </div>
        <div>
          <Link href="/property/create">
            <Button
              variant="secondary"
              className={cn(
                "h-[350px] mx-4 w-[350px] text-lg bg-primary/10 hover:bg-primary/20 rounded flex-col justify-evenly  text-muted-foreground",
                font.className
              )}
            >
              <PlusIcon className="h-10 w-10" />
              List a property
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
