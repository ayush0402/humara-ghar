import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import teamWorkSVG from "../../../public/teamwork.svg";
import Image from "next/image";
import TeamDetails from "@/components/custom/team-details";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateTeamDialog from "@/components/custom/create-team-dialog";
import WaitingTeamInvites from "@/components/custom/waiting-team-invites";

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

  let teamMembers = [];

  if (teamData) {
    const { data, error } = await supabase
      .from("team_members")
      .select("*, user_profiles(name, gender)")
      .eq("team_id", teamData.team_id);

    if (data) teamMembers = data;
  }

  console.log("teamMembersXuserProfiles", teamMembers);
  return (
    <>
      <Tabs
        defaultValue="my-team"
        className="w-full h-full pl-10 pr-10 pb-10 pt-2"
      >
        <TabsList>
          <TabsTrigger value="my-team">My Team</TabsTrigger>
          <TabsTrigger value="invites">Invites</TabsTrigger>
        </TabsList>
        <TabsContent value="my-team" className="container mt-8">
          {teamMembers.length > 1 ? (
            <>
              <div className="flex flex-row justify-around gap-4 w-full">
                <div className="flex flex-col justify-start border-2">
                  {teamMembers.map((teamMember, index) => (
                    <TeamDetails key={index} {...teamMember} />
                  ))}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default">Create Team Now</Button>
                  </DialogTrigger>
                  <CreateTeamDialog />
                </Dialog>
              </div>
            </>
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

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default">Create Team Now</Button>
                </DialogTrigger>
                <CreateTeamDialog />
              </Dialog>
            </div>
          )}
        </TabsContent>
        <TabsContent value="invites" className="container">
          <WaitingTeamInvites userId={userId} />
        </TabsContent>
      </Tabs>
    </>
  );
}
