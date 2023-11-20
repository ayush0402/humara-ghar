import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import teamWorkSVG from "../../../public/teamwork.svg";
import Image from "next/image";
import TeamDetails from "@/components/custom/team-details";

const revalidate = 60;

export default async function TeamsPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const userId = user?.id;

  if (!userId) {
    return <div>User not logged in</div>;
  }

  const { data: teamData, error: teamError } = await supabase
    .from("team_members")
    .select("team_id")
    .eq("user_id", userId)
    .single();

  return (
    <>
      <Tabs
        defaultValue="my-team"
        className="w-full h-full pl-10 pr-10 pb-10 pt-2"
      >
        <TabsList>
          <TabsTrigger value="my-team">My Team</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>
        <TabsContent
          value="my-team"
          className="container w-full w-[600px] mt-8"
        >
          {teamData ? (
            <TeamDetails />
          ) : (
            <div className="flex flex-col justify-between items-center p-10 gap-5">
              <Image
                src={teamWorkSVG}
                width="200"
                height="200"
                alt="teamwork-svg"
              />
              <h5 className="scroll-m-20 text-xl font-semibold tracking-tight text-primary">
                Two heads are better than one
              </h5>
              <p className="leading-7 [&:not(:first-child)]:mt-1">
                If you are unable to find a pre-occupied flat for yourself, you
                can make a team with other user and find flat together.
              </p>
              <Button variant="default" className="p-2">
                Create Team Now
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="requests" className="container">
          Pending Requests
        </TabsContent>
      </Tabs>
    </>
  );
}
