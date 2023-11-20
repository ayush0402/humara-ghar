import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function TeamsPage() {
  const originUrl = process.env.NEXT_PUBLIC_ORIGIN_URL;
  // cannot read properties of null (reading 'useContext')
  const myTeam = await fetch(`${originUrl}/api/teams/my-team`).then((res) =>
    res.json()
  );
  console.log(myTeam);
  return (
    <>
      <Tabs defaultValue="my-team" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="my-team">My Team</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="my-team" className="container">
          My Team
        </TabsContent>
        <TabsContent value="requests" className="container">
          Pending Requests
        </TabsContent>
      </Tabs>
    </>
  );
}
