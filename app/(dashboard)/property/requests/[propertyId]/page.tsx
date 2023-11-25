import TeamCard from "@/components/custom/team-card";
import UserCard from "@/components/custom/user-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import React, { useEffect, useState } from "react";

const page = async ({ params }: { params: { propertyId: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  //console.log(params);
  const propertyId = params.propertyId;

  const { data: userInfo } = await supabase
    .from("property_requests")
    .select("*")
    .eq("property_id", propertyId)
    .eq("type", "Solo");

  const { data: teamInfo } = await supabase
    .from("property_requests")
    .select("*")
    .eq("property_id", propertyId)
    .eq("type", "Team");

  return (
    <div className="ml-5 flex flex-wrap">
      {userInfo?.map((users) => (
        <UserCard
          Id={users.team_user_id}
          ImageSrc="https://picsum.photos/200"
        />
      ))}
      {teamInfo?.map((teams) => (
        <TeamCard
          Id={teams.team_user_id}
          ImageSrc="https://picsum.photos/200"
        />
      ))}
    </div>
  );
};

export default page;
