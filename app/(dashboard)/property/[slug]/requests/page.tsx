import TeamCard from "@/components/custom/team-card";
import UserCard from "@/components/custom/user-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import React, { useEffect, useState } from "react";

const page = async () => {
  
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: userInfo } = await supabase.from("user_profiles").select("*");
  const { data: teamInfo } = await supabase.from("team_members").select("*");
  
  
  return (
    <div className="ml-5 flex flex-wrap">
      {userInfo?.map((users) => (
        <UserCard
          Id={users.user_id}
          ImageSrc="https://picsum.photos/200"
        />
      ))}
      {
        teamInfo?.map((teams)=>(
          <TeamCard 
           Id = {teams.team_id}
           ImageSrc="https://picsum.photos/200"
           />
        ))
      }
    </div>
  );
};

export default page;
