import { Metadata } from "next";
import OnboardingForm from "@/components/custom/onboarding-form";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Poppins } from 'next/font/google';
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Enter all details to complete the onboarding process.",
};

const font = Poppins({
  weight: '600',
  subsets: ['latin'],
});

export default async function OnboardingPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user){
    redirect("/login");
  }

  return (
    <>
      <div className="container grid relative min-h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome 
              </h1>
              <p className="text-sm text-muted-foreground">
                Please enter your details before you can start browsing
                HumaraGhar.
              </p>
            </div>
            <OnboardingForm />
          </div>
        </div>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <Link href='/'>
            <div
              className={cn(
                'hidden  md:block text-xl md:text-xl font-bold ',
                font.className
              )}>
              <span className='inline-block text-primary'>humara</span>
              <span className='inline-block '>ghar</span>
            </div>
          </Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Find properties to rent and people to share with right
                here, with us.&rdquo;
              </p>
              <footer className="text-sm">Ayush Kumar</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
}
