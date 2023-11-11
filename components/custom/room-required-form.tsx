"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import Messages from "@/components/custom/message";
import { Textarea } from "@/components/ui/textarea";
import { Button, buttonVariants } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const roomRequiredFormSchema = z.object({
  available_date: z.date({
    required_error: "A date is required.",
  }),
  rent: z.string({
    required_error: "Please enter your rent.",
  }),
  location: z.enum(
    [
      "mumbai",
      "delhi",
      "bangalore",
      "hyderabad",
      "ahmedabad",
      "chennai",
      "kolkata",
      "surat",
      "pune",
      "jaipur",
      "lucknow",
      "kanpur",
      "nagpur",
      "indore",
      "thane",
      "bhopal",
      "visakhapatnam",
      "pimpri-chinchwad",
      "patna",
      "vadodara",
      "ghaziabad",
      "ludhiana",
      "coimbatore",
      "agra",
      "madurai",
      "nashik",
      "faridabad",
      "meerut",
      "rajkot",
      "kalyan-dombivli",
      "vasai-virar",
      "varanasi",
      "srinagar",
      "aurangabad",
      "dhanbad",
      "amritsar",
      "navi mumbai",
      "allahabad",
      "ranchi",
      "howrah",
      "jabalpur",
      "gwalior",
      "vijayawada",
      "jodhpur",
      "raipur",
      "kota",
      "guwahati",
      "chandigarh",
      "thiruvananthapuram",
      "solapur",
    ],
    {
      invalid_type_error: "Select a city",
      required_error: "Please select a city.",
    }
  ),
  gender: z.enum(["male", "female", "any"], {
    required_error: "Please select a gender.",
  }),
  occupancy: z.enum(["single", "shared", "any"], {
    required_error: "Please select occupancy.",
  }),
  mobile: z.string().min(10, {
    message: "Mobile number must be at least 10 characters.",
  }),
  allow_teams: z.boolean().default(false),
  allow_pg: z.boolean().default(false),
  description: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

type RoomRequiredFormValues = z.infer<typeof roomRequiredFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<RoomRequiredFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

export default function RoomRequiredForm() {
  const form = useForm<RoomRequiredFormValues>({
    resolver: zodResolver(roomRequiredFormSchema),
    defaultValues,
  });

  const router = useRouter();
  const onSubmit = async (data: RoomRequiredFormValues) => {
    try {
      const response = await fetch("/api/listings/room", {
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
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Messages />
        <div className="grid grid-cols-1 md:grid-cols-2">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <div className="relative w-max">
                  <FormControl>
                    <select
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-[200px] appearance-none bg-transparent font-normal"
                      )}
                      {...field}
                    >
                      <option value="mumbai">Mumbai</option>
                      <option value="delhi">Delhi</option>
                      <option value="bangalore">Bangalore</option>
                      <option value="hyderabad">Hyderabad</option>
                      <option value="ahmedabad">Ahmedabad</option>
                      <option value="chennai">Chennai</option>
                      <option value="kolkata">Kolkata</option>
                      <option value="surat">Surat</option>
                      <option value="pune">Pune</option>
                      <option value="jaipur">Jaipur</option>
                      <option value="lucknow">Lucknow</option>
                      <option value="kanpur">Kanpur</option>
                      <option value="nagpur">Nagpur</option>
                      <option value="indore">Indore</option>
                      <option value="thane">Thane</option>
                      <option value="bhopal">Bhopal</option>
                      <option value="visakhapatnam">Visakhapatnam</option>
                      <option value="pimpri-chinchwad">Pimpri-Chinchwad</option>
                      <option value="patna">Patna</option>
                      <option value="vadodara">Vadodara</option>
                      <option value="ghaziabad">Ghaziabad</option>
                      <option value="ludhiana">Ludhiana</option>
                      <option value="coimbatore">Coimbatore</option>
                      <option value="agra">Agra</option>
                      <option value="madurai">Madurai</option>
                      <option value="nashik">Nashik</option>
                      <option value="faridabad">Faridabad</option>
                      <option value="meerut">Meerut</option>
                      <option value="rajkot">Rajkot</option>
                      <option value="kalyan-dombivli">Kalyan-Dombivli</option>
                      <option value="vasai-virar">Vasai-Virar</option>
                      <option value="varanasi">Varanasi</option>
                      <option value="srinagar">Srinagar</option>
                      <option value="aurangabad">Aurangabad</option>
                      <option value="dhanbad">Dhanbad</option>
                      <option value="amritsar">Amritsar</option>
                      <option value="navi mumbai">Navi Mumbai</option>
                      <option value="allahabad">Allahabad</option>
                      <option value="ranchi">Ranchi</option>
                      <option value="howrah">Howrah</option>
                      <option value="jabalpur">Jabalpur</option>
                      <option value="gwalior">Gwalior</option>
                      <option value="vijayawada">Vijayawada</option>
                      <option value="jodhpur">Jodhpur</option>
                      <option value="raipur">Raipur</option>
                      <option value="kota">Kota</option>
                      <option value="guwahati">Guwahati</option>
                      <option value="chandigarh">Chandigarh</option>
                      <option value="thiruvananthapuram">
                        Thiruvananthapuram
                      </option>
                      <option value="solapur">Solapur</option>
                    </select>
                  </FormControl>
                  <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Looking For</FormLabel>
                <FormMessage />
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid max-w-md grid-cols-3 gap-3 pt-2"
                >
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:bg-primary [&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div]:text-background">
                      <FormControl>
                        <RadioGroupItem value="male" className="sr-only" />
                      </FormControl>
                      <div className="rounded-lg border-2 border-muted flex justify-center items-center p-3">
                        Male
                      </div>
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:bg-primary [&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div]:text-background">
                      <FormControl>
                        <RadioGroupItem value="female" className="sr-only" />
                      </FormControl>
                      <div className="rounded-lg border-2 border-muted flex justify-center items-center p-3">
                        Female
                      </div>
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:bg-primary [&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div]:text-background">
                      <FormControl>
                        <RadioGroupItem value="any" className="sr-only" />
                      </FormControl>
                      <div className="rounded-lg border-2 border-muted flex justify-center items-center p-3">
                        Any
                      </div>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rent"
            render={({ field }) => (
              <FormItem className="w-max mt-5">
                <FormLabel>Approx Rent</FormLabel>
                <FormControl>
                  <Input placeholder="5000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="occupancy"
            render={({ field }) => (
              <FormItem className="space-y-1 mt-5">
                <FormLabel>Occupancy</FormLabel>
                <FormMessage />
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid max-w-md grid-cols-3 gap-3 pt-2"
                >
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:bg-primary [&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div]:text-background">
                      <FormControl>
                        <RadioGroupItem value="single" className="sr-only" />
                      </FormControl>
                      <div className="rounded-lg border-2 border-muted flex justify-center items-center p-3">
                        Single
                      </div>
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:bg-primary [&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div]:text-background">
                      <FormControl>
                        <RadioGroupItem value="shared" className="sr-only" />
                      </FormControl>
                      <div className="rounded-lg border-2 border-muted flex justify-center items-center p-3">
                        Shared
                      </div>
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:bg-primary [&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div]:text-background">
                      <FormControl>
                        <RadioGroupItem value="any" className="sr-only" />
                      </FormControl>
                      <div className="rounded-lg border-2 border-muted flex justify-center items-center p-3">
                        Any
                      </div>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem className="w-max mt-5">
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder="9999999999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="available_date"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-7">
                <FormLabel>Date Available</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date > new Date("2100-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="allow_teams"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Allow teams?</FormLabel>
                <FormDescription>
                  Let other people send you requests to join your team and find
                  rooms together.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-readonly
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allow_pg"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Allow PG?</FormLabel>
                <FormDescription>Are you interested in PG too?</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-readonly
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="I am looking for a roommate for my room."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
