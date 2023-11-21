"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MdLocationOn } from "react-icons/md";
import { Button } from "@/components/ui/button";

type TeamInviteCardProps = {
  imageSrc: string;
  name: string;
  location: string;
  rentAmount: number;
  lookingForGender: string;
  lookingForType: string;
  matchPercentage: number;
  userId: string;
  currentUserId: string;
  currentUserName: string;
};

export default function TeamInviteActionCard({
  imageSrc,
  name,
  location,
  rentAmount,
  lookingForGender,
  lookingForType,
  matchPercentage,
  userId,
  currentUserId,
  currentUserName,
}: TeamInviteCardProps) {
  const handleOnClickAccept = async () => {};
  const handleOnClickReject = async () => {};

  return (
    <>
      <Card className="flex flex-row p-3 max-h-[250px] w-full mx-2 my-2 cursor-pointer transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-lg">
        <CardHeader className="border-2 p-0 m-0">
          <CardTitle>
            <img src="https://picsum.photos/200" height="200px" width="200px" />
          </CardTitle>
        </CardHeader>
        <a
          className="w-full"
          target="_blank"
          href={`${process.env.NEXT_PUBLIC_ORIGIN_URL}/roommate/${userId}`}
          rel="noopener noreferrer"
        >
          <CardContent className="flex flex-col justify-around">
            <div className="text-lg font-semibold">{name}</div>
            <p className="text-sm text-muted-foreground flex flex-row items-center">
              <MdLocationOn />
              {location}
            </p>
            <div className="flex flex-row justify-between mt-2">
              <div className="flex flex-col">
                <small className="text-sm font-medium leading-none">
                  Looking For
                </small>
                <p className="text-sm text-muted-foreground">
                  {lookingForGender}, {lookingForType}
                </p>
              </div>
              <div className="flex flex-col">
                <small className="text-sm font-medium leading-none">Rent</small>
                <p className="text-sm text-muted-foreground">{rentAmount}</p>
              </div>
              <div className="flex flex-col">
                <small className="text-sm font-medium leading-none">
                  Match
                </small>
                <p className="text-sm text-muted-foreground">
                  {matchPercentage}%
                </p>
              </div>
            </div>
          </CardContent>
        </a>
        <CardFooter className="m-0 p-0 flex flex-col justify-end">
          <Button className="default m-2" onClick={handleOnClickAccept}>
            Accept
          </Button>
          <Button className="danger m-2" onClick={handleOnClickReject}>
            Reject
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
