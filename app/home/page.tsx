import AuthButton from "../../components/auth-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { MdLocationOn } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

      <div className="hidden container flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <MdLocationOn size={32} />
              asdsd
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="roommates">Roommates</TabsTrigger>
              <TabsTrigger value="pg">PG</TabsTrigger>
            </TabsList>
            <TabsContent value="rooms" className="space-y-4">
              Rooms
            </TabsContent>
            <TabsContent value="roommates" className="space-y-4">
              Roommates
            </TabsContent>
            <TabsContent value="pg" className="space-y-4">
              PG
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
