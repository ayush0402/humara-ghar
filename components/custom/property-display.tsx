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

type PropertyDisplayProps = {
  imageSrc: string;
  location: string;
  rentAmount: string;
  area: string;
  bhk: string;
  bathroom: string;
  address: string;
  locality: string;
  userId: string;
  occupancy: string;
  amenities: [];
};

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});
export default async function PropertyDisplay({
  imageSrc,
  location,
  rentAmount,
  area,
  bhk,
  bathroom,
  address,
  locality,
  userId,
  occupancy,
  amenities,
}: PropertyDisplayProps) {
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

  //console.log(prefrences)
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
      stat: preferences && preferences[0].vegan,
    },
    {
      icon: GiMusicalNotes,
      label: "Music Lover",
      stat: preferences && preferences[0].musiclover,
    },
    {
      icon: FaDumbbell,
      label: "Fitness",
      stat: preferences && preferences[0].fitness,
    },
    {
      icon: GiBookshelf,
      label: "Studious",
      stat: preferences && preferences[0].studious,
    },
    {
      icon: MdSportsCricket,
      label: "Sporty",
      stat: preferences && preferences[0].sporty,
    },
    {
      icon: GiEarthAmerica,
      label: "Wanderer",
      stat: preferences && preferences[0].wanderer,
    },
    {
      icon: MdPets,
      label: "Pet Lover",
      stat: preferences && preferences[0].petlover,
    },
    {
      icon: MdNoDrinks,
      label: "Non-Alcoholic",
      stat: preferences && preferences[0].nonalcoholic,
    },
    {
      icon: FaSmokingBan,
      label: "Non-Smoker",
      stat: preferences && preferences[0].nonsmoker,
    },
  ];

  const utils = [
    {
      id: "tv",
      label: "TV",
      icon: Tv2Icon,
    },
    {
      id: "fridge",
      label: "Fridge",
      icon: Refrigerator,
    },
    {
      id: "kitchen",
      label: "Kitchen",
      icon: Cookie,
    },
    {
      id: "wifi",
      label: "WiFi",
      icon: WifiIcon,
    },
    {
      id: "washingm_machine",
      label: "Washing Machine",
      icon: Shirt,
    },
    {
      id: "ac",
      label: "AC",
      icon: AirVent,
    },
    {
      id: "power_backup",
      label: "Power Backup",
      icon: BatteryCharging,
    },
    {
      id: "cook",
      label: "Cook",
      icon: ChefHat,
    },
    {
      id: "parking",
      label: "Parking",
      icon: ParkingCircle,
    },
  ];

  return (
    <div className="bg-secondary h-full flex">
      <div>
        <div className="bg-primary/10 min-h-screen w-[350px] rounded-[20px]">
          <div className="flex flex-col items-center justify-start">
            <div className="my-2 z-0">
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
              <HoverCard>
                <HoverCardTrigger>
                  <div
                    key={index}
                    className="mx-4 my-4  flex items-center justify-center"
                  >
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
            ))}
          </div>
        </div>
      </div>
      <div className="flex-col mx-5 my-10">
        <div className="flex">
          <div className="">
            <div
              className={cn(
                "text-muted-foreground text-xl mt-[40px]",
                font.className
              )}
            >
              Location:
            </div>
            <div className={cn("text-2xl my-2 flex", font.className)}>
              <MapPin className="mr-2 my-1" />
              {location[0].toUpperCase() + location.substring(1)}
            </div>
          </div>
          <div className="ml-[80px] my-9">
            <div
              className={cn("text-muted-foreground text-xl", font.className)}
            >
              Locality:
            </div>
            <div className={cn("text-2xl my-2 flex", font.className)}>
              <MapPin className="mr-2 my-1" />
              {locality[0].toUpperCase() + locality.substring(1)}
            </div>
          </div>
          <div className="ml-[80px] my-9">
            <div
              className={cn("text-muted-foreground text-xl", font.className)}
            >
              Approx Rent:
            </div>
            <div className={cn("text-2xl my-2 flex", font.className)}>
              ₹ {rentAmount}
            </div>
          </div>
          <div className="ml-[80px] my-9">
            <div
              className={cn("text-muted-foreground text-xl", font.className)}
            >
              Occupancy:
            </div>
            <div className={cn("text-2xl my-2 flex", font.className)}>
              {occupancy}
            </div>
          </div>
        </div>
        <div className="flex">
          <div>
            <div
              className={cn(
                "text-muted-foreground text-lg mt-[40px]",
                font.className
              )}
            >
              Area in sqft:
            </div>
            <div className={cn("text-xl my-2 flex", font.className)}>
              {area}
            </div>
          </div>
          <div className="ml-5">
            <div
              className={cn(
                "text-muted-foreground text-lg mt-[40px]",
                font.className
              )}
            >
              BHK:
            </div>
            <div className={cn("text-xl my-2 flex", font.className)}>{bhk}</div>
          </div>
          <div className="ml-5">
            <div
              className={cn(
                "text-muted-foreground text-lg mt-[40px]",
                font.className
              )}
            >
              Bathroom:
            </div>
            <div className={cn("text-xl my-2 flex", font.className)}>
              {bathroom}
            </div>
          </div>
        </div>
        <div>
          <div
            className={cn(
              "text-muted-foreground text-lg mt-[40px]",
              font.className
            )}
          >
            Pictures:
          </div>
        </div>
        <div className="my-2">
          <img
            src="https://picsum.photos/200"
            alt=""
            className="h-[500px] w-[800px]"
          />
        </div>
        <div>
          <div
            className={cn(
              "text-muted-foreground text-lg mt-[20px]",
              font.className
            )}
          >
            Amenities:
          </div>
          <div className="flex flex-wrap my-2">
            {utils.map(
              (ameni) =>
                amenities.includes(ameni.id) && (
                  <React.Fragment key={ameni.id}>
                    <div className="flex flex-col items-center justify-center">
                      <div>
                        {React.createElement(ameni.icon, {
                          className: "h-[40px] w-[40px] mx-2",
                        })}
                      </div>
                      <div className={cn("text-xs my-1", font.className)}>
                        {ameni.label}
                      </div>
                    </div>
                  </React.Fragment>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
