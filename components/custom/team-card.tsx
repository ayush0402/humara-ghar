import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { MdLocationOn } from "react-icons/md";
import { Button } from "../ui/button";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

type UserCardProps = {
  Id: string;
  ImageSrc: string;
};
const TeamCard = async ({
  Id,
  ImageSrc,
  
}: UserCardProps) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const name="Team"

  return (
    <Link
      href={{
        pathname: `/team/display/${Id}`,
        query: {
          id: Id,
        },
      }}
      as={`/team/display/${Id}`}
    >
      <Card className="w-full mx-2 my-2 lg:w-[450px] cursor-pointer transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-lg">
        <div className="flex flex-row w-full">
          <img
            className="w-1/5 h-1/5 lg:w-2/5 lg:h-2/5 object-cover"
            src={ImageSrc}
            alt={name}
          />
          <div>
            <CardHeader className="pt-2 pl-4 lg:pl-6">
              <CardTitle className="text-xl lg:text-2xl">{name}</CardTitle>
              <CardDescription className="flex flex-row items-center">
                <MdLocationOn />
                {/* {location[0].toUpperCase() + location.substring(1)} */}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col w-full pl-4 pb-1 lg:pl-6 lg:text-lg">
              {/* <span>
                &#8377; {rentAmount}{" "}
                <span className="text-muted-foreground">Rent</span>
              </span> */}
              <div>
                {/* <p className="text-sm text-muted-foreground mt-2 lg:text-md">
                  Looking for
                </p>
                <p className="text-sm lg:text-md">
                  {lookingForGender} {lookingForType}
                </p> */}
              </div>
            </CardContent>
          </div>
        </div>
        <div className="border-t"></div>
        <CardFooter className="text-sm p-1 px-5 flex flex-row justify-between"></CardFooter>
      </Card>
    </Link>
  );
};

export default TeamCard;
