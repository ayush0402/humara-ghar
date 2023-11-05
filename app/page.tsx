import AuthButton from "../components/auth-button";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function Index() {
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
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
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
      <header className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Humara Ghar <br className="hidden sm:inline" />
            perfect way to find your perfect roommates.
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Built with nextjs, tailwindcss, supabase, and love &hearts;.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="https://ui.shadcn.com/"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants()}
          >
            Documentation
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://github.com/ayush0402/humara-ghar/"
            className={buttonVariants({ variant: "outline" })}
          >
            GitHub
          </Link>
        </div>
      </header>
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3"></div>
    </div>
  );
}
