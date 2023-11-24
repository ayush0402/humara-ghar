import UserCard from "@/components/custom/user-card";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: userInfo } = await supabase.from("user_profiles").select("*");
  return (
    <div className="ml-5 flex flex-wrap">
      {userInfo?.map((users) => (
        <UserCard
          Id={users.user_id}
          ImageSrc="https://picsum.photos/200"
          name={users.name}
          gender={users.gender}
          location={users.location_city}
          contact={users.email_id}
        />
      ))}
    </div>
  );
};

export default page;
