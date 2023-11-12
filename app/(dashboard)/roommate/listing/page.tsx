import { ThemeToggle } from "@/components/theme-toggle";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoommateRequiredForm from "@/components/custom/roommate-required-form";
import RoomRequiredForm from "@/components/custom/room-required-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary text-muted-foreground ml-[-10px]">
      {/* Your content goes here */}
      <RoommateRequiredForm />
    </div>
  );
}
