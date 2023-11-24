import React from "react";
import MaleAvatar from "./male-avatar";
import { Button } from "@/components/ui/button";
import { MdChat } from "react-icons/md";
import { PhoneCallIcon } from "lucide-react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { MdNoDrinks, MdPets, MdSportsCricket } from "react-icons/md";
import {
  AirVent,
  BatteryCharging,
  ChefHat,
  Cookie,
  MapPin,
  ParkingCircle,
  Phone,
  Refrigerator,
  Shirt,
  Tv2Icon,
  WifiIcon,
} from "lucide-react";
import {
  GiBookshelf,
  GiEarthAmerica,
  GiMusicalNotes,
  GiNightSleep,
  GiPartyPopper,
  GiPlantRoots,
  GiSunrise,
} from "react-icons/gi";
import { FaDumbbell, FaSmokingBan } from "react-icons/fa";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Avatar, AvatarImage } from "../ui/avatar";

type UserDisplayProps = {
  Id: string;
};
const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const UserDisplayCard = async ({ Id }: UserDisplayProps) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: preferences } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", Id);

  const { data: userInfo } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", Id);
  const { data: publicAvatarImageUrl } = supabase.storage
    .from("avatar-images")
    .getPublicUrl(Id);

  const pref = [
    {
      icon: GiNightSleep,
      label: "NightOwl",
      stat: preferences && preferences[0].prefs.nightowl,
    },
    {
      icon: GiSunrise,
      label: "Earlybird",
      stat: preferences && preferences[0].prefs.earlybird,
    },
    {
      icon: GiPartyPopper,
      label: "Party Popper",
      stat: preferences && preferences[0].prefs.partylover,
    },
    {
      icon: GiPlantRoots,
      label: "Vegan",
      stat: preferences && preferences[0].prefs.vegan,
    },
    {
      icon: GiMusicalNotes,
      label: "Music Lover",
      stat: preferences && preferences[0].prefs.musiclover,
    },
    {
      icon: FaDumbbell,
      label: "Fitness",
      stat: preferences && preferences[0].prefs.fitness,
    },
    {
      icon: GiBookshelf,
      label: "Studious",
      stat: preferences && preferences[0].prefs.studious,
    },
    {
      icon: MdSportsCricket,
      label: "Sporty",
      stat: preferences && preferences[0].prefs.sporty,
    },
    {
      icon: GiEarthAmerica,
      label: "Wanderer",
      stat: preferences && preferences[0].prefs.wanderer,
    },
    {
      icon: MdPets,
      label: "Pet Lover",
      stat: preferences && preferences[0].prefs.petlover,
    },
    {
      icon: MdNoDrinks,
      label: "Non-Alcoholic",
      stat: preferences && preferences[0].prefs.nonalcoholic,
    },
    {
      icon: FaSmokingBan,
      label: "Non-Smoker",
      stat: preferences && preferences[0].prefs.nonsmoker,
    },
  ];
  console.log(publicAvatarImageUrl)

  return (
    <div className="flex">
      <div className="bg-primary/10 min-h-screen w-[350px] rounded-[20px] flex align-middle justify-center">
        <div className="flex-col">
          <div className="flex justify-center">
            <div>
              <Avatar className="h-[200px] w-[200px] z-0">
                <AvatarImage src={publicAvatarImageUrl.publicUrl} />
              </Avatar>
            </div>
          </div>
          <div className={cn("my-4 flex justify-center", font.className)}>
            {userInfo && userInfo[0].name}
          </div>
          <div className="flex justify-center">
            <div>
              <Button className="mx-2 my-4">
                <MdChat className="h-[15px] w-[15px]" />
              </Button>
            </div>
            <div>
              <Button className="mx-2 my-4">
                <PhoneCallIcon className="h-[15px] w-[15px]" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between my-2">
            <div className={cn("mx-2", font.className)}>
              Gender: {userInfo && userInfo[0].gender}
            </div>
            <div className={cn("mx-2", font.className)}>
              DOB: {userInfo && userInfo[0].dob}
            </div>
          </div>
          <div
            className={cn(
              "flex justify-start items-start my-5",
              font.className
            )}
          >
            Description:
          </div>
        </div>
      </div>
      <div>
        <div className={cn("my-5 mx-5 text-2xl", font.className)}>
          Location: {userInfo && userInfo[0].location_city}
        </div>
        <div className={cn("my-5 mx-5 text-xl", font.className)}>
          Preferences:
        </div>

        <div className="flex flex-wrap justify-center">
          {pref.map((preference, index) => (
            <HoverCard>
              <HoverCardTrigger>
                <div
                  key={index}
                  className="mx-4 my-4  flex items-center justify-center"
                >
                  {preference.stat && (
                    <div>
                      <div className="bg-primary/10 h-[75px] w-[75px] rounded-[15px] flex items-center justify-center">
                        {<preference.icon className="h-[50px] w-[50px]" />}
                      </div>
                      <div className="flex justify-center">
                        {preference.label}
                      </div>
                    </div>
                  )}
                </div>
              </HoverCardTrigger>
              {preference.stat && (
                <HoverCardContent
                  className={cn("rounded-[15px] w-full", font.className)}
                >
                  {preference.label}
                </HoverCardContent>
              )}
            </HoverCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDisplayCard;
