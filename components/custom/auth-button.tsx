import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", user?.id);

  return user ? (
    <div className="flex items-center gap-4">
      <Link href="/profile" className={buttonVariants({ variant: "ghost" })}>
        Hey, {data && data[0].name} !
      </Link>

      <form action="/api/auth/sign-out" method="post">
        <Button variant="outline">Logout</Button>
      </form>
    </div>
  ) : (
    <Link href="/login" className={buttonVariants({ variant: "outline" })}>
      Login
    </Link>
  );
}
