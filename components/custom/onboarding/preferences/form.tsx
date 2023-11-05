"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { GiNightSleep, GiSunrise } from "react-icons/gi";
import { FaDumbbell } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  nightowl: z.boolean().default(false).optional(),
  earlybird: z.boolean().default(false).optional(),
  fitness: z.boolean().default(false).optional(),
  abc: z.boolean().default(false).optional(),
  def: z.boolean().default(false).optional(),
  ghi: z.boolean().default(false).optional(),
  jkl: z.boolean().default(false).optional(),
  mno: z.boolean().default(false).optional(),
  pqr: z.boolean().default(false).optional(),
  stu: z.boolean().default(false).optional(),
  vwx: z.boolean().default(false).optional(),
  yza: z.boolean().default(false).optional(),
});

export default function PreferencesForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nightowl: false,
      earlybird: false,
      fitness: false,
      abc: false,
      def: false,
      ghi: false,
      jkl: false,
      mno: false,
      pqr: false,
      stu: false,
      vwx: false,
      yza: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* 
        Default shadcn template with checkbox
        <FormField
          control={form.control}
          name="nightowl"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="leading-none p-4 m-2 bg-gray-200 rounded">
                <FormLabel className="mb-2">
                  <GiNightSleep size={50} className="mx-auto" />
                </FormLabel>
                <FormDescription className="text-center">
                  Night Owl
                </FormDescription>
              </div>
            </FormItem>
          )}
        /> */}
        <div className="grid grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="nightowl"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${
        field.value ? "border-2 border-primary" : "border-2 border-gray-300"
      } m-4 min-w-fit`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded">
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
      ${
        field.value ? "border-2 border-primary" : "border-2 border-gray-300"
      } m-4 min-w-fit`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded">
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
      ${
        field.value ? "border-2 border-primary" : "border-2 border-gray-300"
      } m-4 min-w-fit`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded">
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
            name="abc"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${
        field.value ? "border-2 border-primary" : "border-2 border-gray-300"
      } m-4 min-w-fit`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded">
                  <FormLabel className="mb-2">
                    <GiNightSleep size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    abc
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="def"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${
        field.value ? "border-2 border-primary" : "border-2 border-gray-300"
      } m-4 min-w-fit`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded">
                  <FormLabel className="mb-2">
                    <GiNightSleep size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    def
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ghi"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${
        field.value ? "border-2 border-primary" : "border-2 border-gray-300"
      } m-4 min-w-fit`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded">
                  <FormLabel className="mb-2">
                    <GiNightSleep size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    ghi
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jkl"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${
        field.value ? "border-2 border-primary" : "border-2 border-gray-300"
      } m-4 min-w-fit`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded">
                  <FormLabel className="mb-2">
                    <GiNightSleep size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    jkl
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mno"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${
        field.value ? "border-2 border-primary" : "border-2 border-gray-300"
      } m-4 min-w-fit`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded">
                  <FormLabel className="mb-2">
                    <GiNightSleep size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    mno
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pqr"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${
        field.value ? "border-2 border-primary" : "border-2 border-gray-300"
      } m-4 min-w-fit`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded">
                  <FormLabel className="mb-2">
                    <GiNightSleep size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    pqr
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stu"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${
        field.value ? "border-2 border-primary" : "border-2 border-gray-300"
      } m-4 min-w-fit`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded">
                  <FormLabel className="mb-2">
                    <GiNightSleep size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    stu
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vwx"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${
        field.value ? "border-2 border-primary" : "border-2 border-gray-300"
      } m-4 min-w-fit`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded">
                  <FormLabel className="mb-2">
                    <GiNightSleep size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    vwx
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yza"
            render={({ field }) => (
              <FormItem
                className={`mx-auto flex flex-row items-start space-x-3 space-y-0 rounded-md cursor-pointer 
      ${
        field.value ? "border-2 border-primary" : "border-2 border-gray-300"
      } m-4 min-w-fit`}
                onClick={() => field.onChange(!field.value)}
              >
                <div className="leading-none p-4 m-1 bg-gray-200 rounded">
                  <FormLabel className="mb-2">
                    <GiNightSleep size={50} className="mx-auto" />
                  </FormLabel>
                  <FormDescription className="text-center mt-2">
                    yza
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
