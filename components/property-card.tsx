"use client";
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
import { Building, Check, Phone, PhoneCall, Trash2, X } from "lucide-react";
import WaitingButton from "./waiting-button";
import RejectedButton from "./rejected-button";
import ApprovedButton from "./approved-button";
import { useState } from "react";

type PropertyCardProps = {
  imageSrc: string;
  name: string;
  location: string;
  rentAmount: number;
  area: string;
  bhk: string;
  bathroom: string;
  listing_id: string;
  status: string;
  type:string;
  userId: string;
};

export default function PropertyCard({
  imageSrc,
  name,
  location,
  rentAmount,
  area,
  bhk,
  bathroom,
  listing_id,
  status,
  type,
  userId,
}: PropertyCardProps) { 
  // TODO: Make responsive for mobile
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      setIsSubmitting(true);

      // Send a request to your server to update the property status
      const response = await fetch(`/api/delete-property?id=${listing_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        // Property status updated successfully
        // You can also update the UI or perform additional actions if needed
      } else {
        // Handle error cases
        console.error("Failed to update property status");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  let path;
  if(type=="property")path=`/property/${listing_id}`;
  else path=`/roommate/${userId}`

  const propertyId = "/property/" + listing_id;
  return (
    <Link
      href={{
        pathname: path,
        query: {
          id: listing_id,
        },
      }}
      as={path}
    >
      <Card className="w-full mx-2 my-2 lg:w-[480px] cursor-pointer transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-lg">
        <div className="flex flex-row w-full">
          <img
            className="w-1/5 h-1/5 lg:w-2/5 lg:h-2/5 object-cover"
            src={imageSrc}
            alt={name}
          />
          <div>
            <CardHeader className="pt-2 pl-4 lg:pl-6">
              <CardTitle className="text-xl lg:text-2xl">
                {name[0].toUpperCase() + name.substring(1)}
              </CardTitle>
              <CardDescription className="flex flex-row items-center">
                <MdLocationOn />
                {location[0].toUpperCase() + location.substring(1)}
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
            <HoverCard>
              <HoverCardTrigger>
                <Button
                  variant="secondary"
                  className="h-[50px] w-[50px] bg-inherit hover:bg-destructive rounded"
                  onClick={() => handleDelete(listing_id)}
                  disabled={isSubmitting}
                >
                  <Trash2 className="h-[20px] w-[20px]" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-50">
                Delete Property
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="flex ml-[200px]">
            <div className="mx-2 mt-[10px]">Status:</div>
            <div>
              {status === "0" ? (
                <WaitingButton />
              ) : status === "-1" ? (
                <RejectedButton />
              ) : (
                <ApprovedButton />
              )}
            </div>
          </div>
          <div></div>
        </CardFooter>
      </Card>
    </Link>
  );
}
