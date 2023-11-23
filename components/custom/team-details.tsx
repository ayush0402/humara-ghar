import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface UserProfile {
  name: string;
  gender: string;
  // Add other properties of user_profiles here
}
interface TeamDetailsProps {
  user_id: string;
  team_id: string;
  user_profiles: UserProfile;
}

export default function TeamDetails({
  user_id,
  team_id,
  user_profiles,
}: TeamDetailsProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: publicAvatarImageUrl } = supabase.storage
    .from("avatar-images")
    .getPublicUrl(user_id);

  return (
    <Card className="flex flex-row p-3 max-h-[200px] w-full mx-2 my-2 cursor-pointer transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-lg">
      <CardHeader className="border-2 p-0 m-0">
        <CardTitle>
          <img
            src={publicAvatarImageUrl.publicUrl}
            height="200px"
            width="200px"
          />
        </CardTitle>
      </CardHeader>
      <a
        className="w-full"
        target="_blank"
        href={`${process.env.NEXT_PUBLIC_ORIGIN_URL}/roommate/${user_id}`}
        rel="noopener noreferrer"
      >
        <CardContent className="flex flex-col justify-around">
          <div className="text-lg font-semibold">{user_profiles.name}</div>
          <div className="flex flex-row justify-between mt-2">
            <div className="flex flex-col">
              <small className="text-sm font-medium leading-none">Gender</small>
              <p className="text-sm text-muted-foreground">
                {user_profiles.gender}
              </p>
            </div>
          </div>
        </CardContent>
      </a>
    </Card>
  );
}
