import UserCard from "@/components/custom/user-card";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";

const page = async ({ params }: { params: { slug: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const teamId = params.slug;

  const { data: members } = await supabase
    .from("team_members")
    .select("*")
    .eq("team_id", teamId);

  return (
    <div className="ml-5 flex flex-wrap">
      {members?.map((member) => (
        <UserCard Id={member.user_id} ImageSrc="https://picsum.photos/200" />
      ))}
    </div>
  );
};

export default page;
