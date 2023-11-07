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

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action="/auth/sign-out" method="post">
        <Button variant="outline">Logout</Button>
      </form>
    </div>
  ) : (
    <Link href="/login" className={buttonVariants({ variant: "outline" })}>
      Login
    </Link>
  );
}
