import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdLocationOn, MdChat } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";

type RoommateCardProps = {
  imageSrc: string;
  name: string;
  location: string;
  rentAmount: number;
  lookingForGender: string;
  lookingForType: string;
  matchPercentage: number;
};

export default function RoommateCard({
  imageSrc,
  name,
  location,
  rentAmount,
  lookingForGender,
  lookingForType,
  matchPercentage,
}: RoommateCardProps) {
  return (
    <Card className="w-[450px]">
      <div className="flex flex-row w-full">
        <img className="w-150 h-150 object-cover" src={imageSrc} alt={name} />
        <div>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription className="flex flex-row items-center">
              <MdLocationOn className="p-0" />
              {location}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col w-full">
            <span>&#8377; {rentAmount} Rent</span>
            <div>
              <p className="text-sm text-muted-foreground mt-2">Looking for</p>
              <p className="text-sm">
                {lookingForGender}, {lookingForType}
              </p>
            </div>
          </CardContent>
        </div>
      </div>
      <div className="border-t"></div>
      <CardFooter className="text-sm p-1 px-5 flex flex-row justify-between">
        <div>
          <Button variant="secondary" className="rounded-full">
            <MdChat />
          </Button>
        </div>
        <div className="flex flex-row items-center">
          <FaUserFriends className="mr-2" size={15} />
          {matchPercentage}% Match
        </div>
      </CardFooter>
    </Card>
  );
}
