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
import { Phone, PhoneCall } from "lucide-react";

type RoomCardProps = {
  imageSrc: string;
  name: string;
  location: string;
  rentAmount: number;
  area: string;
  bhk: string;
  bathroom: string;
  listing_id:string;
};

export default function RoomCard({
  imageSrc,
  name,
  location,
  rentAmount,
  area,
  bhk,
  bathroom,
  listing_id,

}: RoomCardProps) {
  // TODO: Make responsive for mobile
  const propertyId = "/property/" + listing_id;
  return (
    <Link
      href={{
        pathname: `/property/${listing_id}`,
        query: {
          id: listing_id,
        },
      }}
      as={`/property/${listing_id}`}
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
            <CardTitle className="text-xl lg:text-2xl">{name[0].toUpperCase() + name.substring(1)}</CardTitle>
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
          <Button variant="secondary" className="rounded-full" >
            <MdChat className="h-[15px] w-[15px]"/>
          </Button>
        </div>
        <div>
        </div>
      </CardFooter>
    </Card>
    </Link>
  );
}
