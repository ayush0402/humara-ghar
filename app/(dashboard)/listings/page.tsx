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
    <div className="w-full h-full">
      <div className="flex flex-wrap mt-[100px] mx-2">
        <div>
          <Link href="/listings/room">
            <Button
              variant="outline"
              className={cn(
                "h-[350px] mx-4 w-[350px] text-lg bg-primary/10 hover:bg-primary/20 rounded flex-col justify-evenly  text-muted-foreground",
                font.className
              )}
            >
              <Building className="h-10 w-10" />
              Need Room
              <p className="text-sm text-muted-foreground">
                looking for a shared flat.
              </p>
            </Button>
          </Link>
        </div>
        <div>
          <Link href="/listings/roommate">
            <Button
              variant="secondary"
              className={cn(
                "h-[350px] mx-4 w-[350px] text-lg bg-primary/10 hover:bg-primary/20 rounded flex-col justify-evenly  text-muted-foreground",
                font.className
              )}
            >
              <Contact2 className="h-10 w-10" />
              Need Roommate
              <p className="text-sm text-muted-foreground">
                have a flat & looking for a roommate.
              </p>
            </Button>
          </Link>
        </div>
        <div>
          <Link href="/listings/property">
            <Button
              variant="secondary"
              className={cn(
                "h-[350px] mx-4 w-[350px] text-lg bg-primary/10 hover:bg-primary/20 rounded flex-col justify-evenly  text-muted-foreground",
                font.className
              )}
            >
              <PlusIcon className="h-10 w-10" />
              List a property
              <p className="text-sm text-muted-foreground">
                Muted description here.
              </p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
