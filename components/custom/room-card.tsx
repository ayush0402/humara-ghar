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
import { Phone, PhoneCall } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useEffect, useState } from "react";

type RoomCardProps = {
  imageSrc: string;
  name: string;
  location: string;
  rentAmount: number;
  area: string;
  bhk: string;
  bathroom: string;
  listing_id: string;
  looking_for: string;
  looking_for_gender: string;
  userId: string;
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
  looking_for,
  looking_for_gender,
  userId,
}: RoomCardProps) {
  // TODO: Make responsive for mobile
  const [interestType, setInterestType] = useState("");
  const propertyId = "/property/" + listing_id;
  // test test
  const handleInterestSelect = async (selectedType: string) => {
    try {
      // Make a POST request to your API route with the selected interest type
      const response = await fetch("/api/property/interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: listing_id,
          interestType: selectedType,
        }),
      });

      if (response.ok) {
        // If the request is successful, update the state or perform any other actions
        setInterestType(selectedType);
      } else {
        // Handle error cases
        console.error("Failed to add interest to the database");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  let path;
  if (looking_for == "Tenant") path = `/property/${listing_id}`;
  else path = `/roommate/${userId}`;

  useEffect(() => {}, [interestType]);
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
                <div>
                  <div className="flex">
                    <MdLocationOn />
                    {location[0].toUpperCase() + location.substring(1)}
                  </div>
                  <div>
                    Looking for: {looking_for}, {looking_for_gender}
                  </div>
                </div>
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
            <Button variant="secondary" className="rounded-full">
              <MdChat className="h-[15px] w-[15px]" />
            </Button>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>Interested</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  Select if you are interested as a team or solo
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleInterestSelect("Solo")}>
                  Solo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleInterestSelect("Team")}>
                  Team
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
