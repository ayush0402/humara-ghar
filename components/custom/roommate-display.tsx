import React from "react";
import { Button } from "../ui/button";
import MaleAvatar from "./male-avatar";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import FemaleAvatar from "./female-avatar";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { MdChat, MdNoDrinks, MdPets, MdSportsCricket } from "react-icons/md";
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
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../ui/hover-card";

type RoommateDisplayProps = {
  userId: string;
};

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});
export default async function RoommateDisplay({
  userId,
}: RoommateDisplayProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: info } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", userId);

  const { data: preferences } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", userId);

  const pref = [
    {
      icon: GiNightSleep,
      label: "NightOwl",
      stat: preferences && preferences[0] && preferences[0].prefs.nightowl,
    },
    {
      icon: GiSunrise,
      label: "Earlybird",
      stat: preferences && preferences[0] && preferences[0].prefs.earlybird,
    },
    {
      icon: GiPartyPopper,
      label: "Party Popper",
      stat: preferences && preferences[0] && preferences[0].prefs.partylover,
    },
    {
      icon: GiPlantRoots,
      label: "Vegan",
      stat: preferences && preferences[0] && preferences[0].vegan,
    },
    {
      icon: GiMusicalNotes,
      label: "Music Lover",
      stat: preferences && preferences[0] && preferences[0].musiclover,
    },
    {
      icon: FaDumbbell,
      label: "Fitness",
      stat: preferences && preferences[0] && preferences[0].fitness,
    },
    {
      icon: GiBookshelf,
      label: "Studious",
      stat: preferences && preferences[0] && preferences[0].studious,
    },
    {
      icon: MdSportsCricket,
      label: "Sporty",
      stat: preferences && preferences[0] && preferences[0].sporty,
    },
    {
      icon: GiEarthAmerica,
      label: "Wanderer",
      stat: preferences && preferences[0] && preferences[0].wanderer,
    },
    {
      icon: MdPets,
      label: "Pet Lover",
      stat: preferences && preferences[0] && preferences[0].petlover,
    },
    {
      icon: MdNoDrinks,
      label: "Non-Alcoholic",
      stat: preferences && preferences[0] && preferences[0].nonalcoholic,
    },
    {
      icon: FaSmokingBan,
      label: "Non-Smoker",
      stat: preferences && preferences[0] && preferences[0].nonsmoker,
    },
  ];

  return (
    <div className="bg-secondary h-full flex">
      <div>
        <div className="bg-primary/10 min-h-screen w-[full] rounded-[20px]">
          <div className="flex flex-col items-center justify-start">
            <div className="my-2">
              {info && info[0].gender === "female" ? (
                <FemaleAvatar />
              ) : (
                <MaleAvatar />
              )}
            </div>
            <div className={cn("my-2 ml-[10px]", font.className)}>
              {info && info[0].name}
            </div>
            <div className={cn("my-2 ml-[10px] flex", font.className)}>
              <div className="">
                <Button>
                  <MdChat className="mr-1" />
                  Chat
                </Button>
              </div>
              <div className="mx-2">
                <Button>
                  <Phone className="mr-1 h-[15px] w-[15px]" />
                  Call
                </Button>
              </div>
            </div>
          </div>
          <div className={cn("my-5 mx-2", font.className)}>Preferences:</div>

          <div className="flex flex-wrap justify-center">
            {pref.map((preference, index) => (
              <div key={index}>
                <HoverCard>
                  <HoverCardTrigger>
                    <div className="mx-4 my-4  flex items-center justify-center">
                      {preference.stat && (
                        <div className="bg-secondary h-[75px] w-[75px] rounded-[15px] flex items-center justify-center">
                          {<preference.icon className="h-[50px] w-[50px]" />}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
