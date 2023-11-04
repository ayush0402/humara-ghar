"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaMale, FaFemale } from "react-icons/fa";
import { CalendarIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import Messages from "@/components/custom/message";
import { Button, buttonVariants } from "@/components/ui/button";
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

const onboardingFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  dob: z.date({
    required_error: "A date of birth is required.",
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
  gender: z.enum(["male", "female"], {
    required_error: "Please select a gender.",
  }),
  user_type: z.enum(["renter", "owner"], {
    invalid_type_error: "Select the reason for signing up.",
    required_error: "Please select the reason for signing up.",
  }),
});

type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<OnboardingFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

export default function OnboardingForm() {
  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues,
  });

  const router = useRouter();

  const onSubmit = async (data: OnboardingFormValues) => {
    try {
      const response = await fetch("/api/onboarding", {
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
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
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormLabel>Gender</FormLabel>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid max-w-md grid-cols-2 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="male" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 bg-[#ecedef] border-muted p-1 hover:border-accent flex justify-center items-center">
                      <div className="space-y-2 rounded-sm p-2 flex justify-center items-center">
                        <FaMale size={30} />
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Male
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="female" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 bg-[#ecedef] border-muted p-1 hover:border-accent flex justify-center items-center">
                      <div className="space-y-2 rounded-sm p-2 flex justify-center items-center">
                        <FaFemale size={30} />
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Female
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Who are you?</FormLabel>
              <div className="relative w-max">
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-[320px] appearance-none bg-transparent font-normal"
                    )}
                    {...field}
                  >
                    <option value="renter">
                      Renter (Looking for rooms/roommates)
                    </option>
                    <option value="owner">
                      Owner (Looking to rent your place)
                    </option>
                  </select>
                </FormControl>
                <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Continue</Button>
        <Messages />
      </form>
    </Form>
  );
}
