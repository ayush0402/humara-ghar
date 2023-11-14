import RoommateCard from "@/components/custom/roommate-card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="space-x-4 space-y-2">
      <div className="flex flex-wrap">
        <RoommateCard
          imageSrc="https://picsum.photos/200"
          name="Listing Name"
          location="Listing Location"
          rentAmount={10000}
          lookingForGender="male"
          lookingForType="roommate"
          matchPercentage={80}
        />
        <RoommateCard
          imageSrc="https://picsum.photos/200"
          name="Listing Name"
          location="Listing Location"
          rentAmount={10000}
          lookingForGender="male"
          lookingForType="roommate"
          matchPercentage={80}
        />
        <RoommateCard
          imageSrc="https://picsum.photos/200"
          name="Listing Name"
          location="Listing Location"
          rentAmount={10000}
          lookingForGender="male"
          lookingForType="roommate"
          matchPercentage={80}
        />
        <RoommateCard
          imageSrc="https://picsum.photos/200"
          name="Listing Name"
          location="Listing Location"
          rentAmount={10000}
          lookingForGender="male"
          lookingForType="roommate"
          matchPercentage={80}
        />
      </div>
    </div>
  );
};

export default page;
