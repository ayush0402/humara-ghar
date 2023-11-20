"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { MdLocationOn, MdChat } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import Link from "next/link";
import { NextResponse } from "next/server";
import { Check, Phone, PhoneCall, X } from "lucide-react";
import { useState } from "react";

type PropertyCardProps = {
  imageSrc: string;
  name: string;
  location: string;
  rentAmount: number;
  area: string;
  bhk: string;
  bathroom: string;
  listing_id:string;
};

export default function AdminPropertyCard({
  imageSrc,
  name,
  location,
  rentAmount,
  area,
  bhk,
  bathroom,
  listing_id,

}: PropertyCardProps) {
  // TODO: Make responsive for mobile
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAction = async (action:string,id:string ) => {
    try {
      setIsSubmitting(true);

      // Send a request to your server to update the property status
      const response = await fetch(
        `/api/update-property-status?id=${listing_id}&action=${action}`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({"action":action,"id":id})
        });

      if (response.ok) {
        // Property status updated successfully
        // You can also update the UI or perform additional actions if needed
      } else {
        // Handle error cases
        console.error('Failed to update property status');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const propertyId = "/room/" + listing_id;
  return (
    <Link href={
      {
        pathname: `/room/${listing_id}`,
        query: {
          id: listing_id,
        }
      }
    } as={`/room/${listing_id}`}>
    <Card className="w-full mx-2 my-2 lg:w-[480px] cursor-pointer transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-lg">
      <div className="flex flex-row w-full">
        <img
          className="w-1/5 h-1/5 lg:w-2/5 lg:h-2/5 object-cover"
          src={imageSrc}
          alt={name}
        />
        <div>
          <CardHeader className="pt-2 pl-4 lg:pl-6">
            <CardTitle className="text-xl lg:text-2xl">{name}</CardTitle>
            <CardDescription className="flex flex-row items-center">
              <MdLocationOn />
              {location}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col w-full pl-4 pb-1 lg:pl-6 lg:text-lg">
            <span>
              &#8377; {rentAmount}{" "}
              <span className="text-muted-foreground">Rent</span>
            </span>
            <div className="flex">
              <p className="text-sm text-muted-foreground mt-2 lg:text-md">
                Area in sqft : {area}
              </p>
              <p className="text-sm text-muted-foreground mt-2 lg:text-md">
                {bhk} BHK
              </p>
              <p className="text-sm text-muted-foreground mt-2 lg:text-md">
                {bathroom} Bathrooms
              </p>
            </div>
          </CardContent>
        </div>
      </div>
      <div className="border-t"></div>
      <CardFooter className="text-sm p-1 px-5 flex flex-row justify-between">
        <div>
          <Button variant="secondary" className="rounded-full" >
            <MdChat className="h-[15px] w-[15px]"/>
          </Button>
        </div>
        <div className="flex ml-[290px]">
        <div className="mx-2 ">
        <HoverCard>
            <HoverCardTrigger>
          <Button className="rounded-full" 
          onClick={() => handleAction('approve',listing_id)}
          disabled={isSubmitting}
          >
            <Check className="h-[15px] w-[15px]"/>
          </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-50">Approve Property</HoverCardContent>
          </HoverCard>
        </div>
        <div>
        <HoverCard>
            <HoverCardTrigger>
          <Button variant="destructive" className="rounded-full" 
          onClick={() => handleAction('reject',listing_id)}
          disabled={isSubmitting}
          >
            <X className="h-[15px] w-[15px]"/>
          </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-50">Reject Property</HoverCardContent>
          </HoverCard>
        </div>
        </div>
        <div>
        </div>
      </CardFooter>
    </Card>
    </Link>
  );
}
