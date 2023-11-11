import AuthButton from "../../components/custom/auth-button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { AiOutlinePlus } from "react-icons/ai";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoommateCard from "@/components/custom/roommate-card";

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
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2 px-8">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <Link
                href="/listing"
                className={buttonVariants({ variant: "default" })}
              >
                <AiOutlinePlus className="pr-2" size={20} /> Add Listing
              </Link>
            </div>
          </div>
          <Tabs defaultValue="roommates" className="space-y-4 p-8">
            <TabsList>
              <TabsTrigger value="roommates">Roommates</TabsTrigger>
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="pg">PG</TabsTrigger>
            </TabsList>
            <TabsContent value="roommates" className="space-y-4">
              Roommates
              <RoommateCard
                imageSrc="https://picsum.photos/200"
                name="Listing Name"
                location="Listing Location"
                rentAmount={10000}
                lookingForGender="male"
                lookingForType="roommate"
                matchPercentage={80}
              />
            </TabsContent>
            <TabsContent value="rooms" className="space-y-4">
              Rooms
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
