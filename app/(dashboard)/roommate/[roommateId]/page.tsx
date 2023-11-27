import { FC } from "react";
import { notFound } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import ChatHeader from "@/components/custom/chat-header";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import PropertyDisplay from "@/components/custom/property-display";
import RoommateDisplay from "@/components/custom/roommate-display";

const Page = async ({ params }: { params: { roommateId: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const user_id = params.roommateId;

  const { data: userInfo } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", user_id);
  
    const {data: roommateInfo} = await supabase
    .from("roommate_required_listings")
    .select("*")
    .eq("created_by",user_id);
    

  return (
    <div className="ml-[10px]">
      <RoommateDisplay 
      userId={user_id} 
      imageSrc="/bed1.png"
      location={roommateInfo && roommateInfo[0].location}
      locality={roommateInfo && roommateInfo[0].locality}
      area = {roommateInfo && roommateInfo[0].area}
      bathroom= { roommateInfo && roommateInfo[0].bathroom}
      bhk = {roommateInfo && roommateInfo[0].bhk}
      rentAmount= {roommateInfo && roommateInfo[0].approx_rent}
      amenities={roommateInfo && roommateInfo[0].ameneties}
      address = {roommateInfo && roommateInfo[0].address}
      occupancy= {roommateInfo && roommateInfo[0].occupancy}
      />
    </div>
  );
};

export default Page;
