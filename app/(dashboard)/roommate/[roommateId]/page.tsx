import { FC } from "react";
import { notFound } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import ChatHeader from "@/components/custom/chat-header";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import PropertyDisplay from "@/components/custom/property-display";
import RoommateDisplay from "@/components/custom/roommate-display";

const Page = async ({params}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const user_id = params.roommateId;

  const { data: userInfo } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", user_id);

  return (
    <div className="ml-[10px]">
      <RoommateDisplay 
        userId = {user_id}/>
    </div>
  );
};

export default Page;
