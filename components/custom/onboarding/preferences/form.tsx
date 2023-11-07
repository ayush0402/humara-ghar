"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import {
  GiNightSleep,
  GiSunrise,
  GiPartyPopper,
  GiPlantRoots,
  GiMusicalNotes,
  GiBookshelf,
  GiEarthAmerica,
} from "react-icons/gi";
import { FaDumbbell, FaSmokingBan } from "react-icons/fa";
import { MdSportsCricket, MdPets, MdNoDrinks } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const FormSchema = z.object({
  nightowl: z.boolean().default(false).optional(),
  earlybird: z.boolean().default(false).optional(),
  fitness: z.boolean().default(false).optional(),
  studious: z.boolean().default(false).optional(),
  sporty: z.boolean().default(false).optional(),
  wanderer: z.boolean().default(false).optional(),
  partylover: z.boolean().default(false).optional(),
  petlover: z.boolean().default(false).optional(),
  vegan: z.boolean().default(false).optional(),
  nonalcoholic: z.boolean().default(false).optional(),
  musiclover: z.boolean().default(false).optional(),
  nonsmoker: z.boolean().default(false).optional(),
});

export default function PreferencesForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nightowl: false,
      earlybird: false,
      fitness: false,
      studious: false,
      sporty: false,
      wanderer: false,
      partylover: false,
      petlover: false,
      vegan: false,
      nonalcoholic: false,
      musiclover: false,
      nonsmoker: false,
    },
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await fetch("/api/onboarding/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // redirect to the next page
      router.push(response.url);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid sm:grid-cols-4 gird-cols-1 gap-4 m-1">
          <FormField
            control={form.control}
            name="nightowl"
            render={({ field }) => (
              <FormItem
                className={`mx-auto lex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${field.value ? "border-2 border-primary" : "border-2 border-gray-300"} `}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded min-w-[150px]">
                  <FormLabel className="mb-2">
                    <GiNightSleep size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    Night Owl
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="earlybird"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${field.value ? "border-2 border-primary" : "border-2 border-gray-300"} `}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded min-w-[150px]">
                  <FormLabel className="mb-2">
                    <GiSunrise size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    Early Bird
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fitness"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${field.value ? "border-2 border-primary" : "border-2 border-gray-300"}`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded min-w-[150px]">
                  <FormLabel className="mb-2">
                    <FaDumbbell size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    Gym Bro
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sporty"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${field.value ? "border-2 border-primary" : "border-2 border-gray-300"}`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded min-w-[150px]">
                  <FormLabel className="mb-2">
                    <MdSportsCricket size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    Sporty
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="wanderer"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${field.value ? "border-2 border-primary" : "border-2 border-gray-300"}`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded min-w-[150px]">
                  <FormLabel className="mb-2">
                    <GiEarthAmerica size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    Wanderer
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="partylover"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${field.value ? "border-2 border-primary" : "border-2 border-gray-300"}`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded min-w-[150px]">
                  <FormLabel className="mb-2">
                    <GiPartyPopper size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    Party Lover
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="petlover"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${field.value ? "border-2 border-primary" : "border-2 border-gray-300"}`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded min-w-[150px]">
                  <FormLabel className="mb-2">
                    <MdPets size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    Pet Lover
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vegan"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${field.value ? "border-2 border-primary" : "border-2 border-gray-300"}`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded min-w-[150px]">
                  <FormLabel className="mb-2">
                    <GiPlantRoots size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    Vegan
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nonalcoholic"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${field.value ? "border-2 border-primary" : "border-2 border-gray-300"}`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded min-w-[150px]">
                  <FormLabel className="mb-2">
                    <MdNoDrinks size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    Non Alcoholic
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="musiclover"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${field.value ? "border-2 border-primary" : "border-2 border-gray-300"}`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded min-w-[150px]">
                  <FormLabel className="mb-2">
                    <GiMusicalNotes size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    Music Lover
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nonsmoker"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${field.value ? "border-2 border-primary" : "border-2 border-gray-300"}`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded min-w-[150px]">
                  <FormLabel className="mb-2">
                    <FaSmokingBan size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    Non Smoker
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studious"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${field.value ? "border-2 border-primary" : "border-2 border-gray-300"}`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded min-w-[150px]">
                  <FormLabel className="mb-2">
                    <GiBookshelf size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    Studious
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
        <Button className="mx-4" variant="outline">
          I want to rent individually
        </Button>
      </form>
    </Form>
  );
}
