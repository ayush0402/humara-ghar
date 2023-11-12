import AuthButton from "../../../components/custom/auth-button";
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
      <div className="h-full">
        hello
      </div>
  );
}
