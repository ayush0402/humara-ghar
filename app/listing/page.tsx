import AuthButton from "../../components/auth-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoommateRequiredForm from "@/components/custom/roommate-required-form";
import RoomRequiredForm from "@/components/custom/room-required-form";

export default function Home() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="w-full gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          HumaraGhar
          {isSupabaseConnected && (
            <div className="flex items-center gap-2">
              <AuthButton />
              <ThemeToggle />
            </div>
          )}
        </div>
      </nav>

      <div className="container flex-col md:flex">
        <div className="flex-1 space-y-4 p-12 pt-6">
          <div className="flex items-center justify-between space-y-2 px-12">
            <h2 className="text-3xl font-bold tracking-tight">Add Listing</h2>
          </div>
          <Tabs defaultValue="need-roommate" className="space-y-4 p-8 px-12">
            <TabsList>
              <TabsTrigger value="need-roommate">Roommates</TabsTrigger>
              <TabsTrigger value="need-room">Rooms</TabsTrigger>
            </TabsList>
            <TabsContent value="need-roommate" className="space-y-4">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Need Roommates
                <p className="text-sm text-muted-foreground">
                  Have flat & looking for flatmate.
                </p>
              </h4>
              <RoommateRequiredForm />
            </TabsContent>
            <TabsContent value="need-room" className="space-y-4">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Need Room
                <p className="text-sm text-muted-foreground">
                  Looking for shared flat.
                </p>
              </h4>
              <RoomRequiredForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
