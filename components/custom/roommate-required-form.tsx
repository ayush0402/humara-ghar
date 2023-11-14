"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { createClient } from "@/utils/supabase/client";
import * as z from "zod";

import { cn } from "@/lib/utils";
import Messages from "@/components/custom/message";
import { Checkbox } from "@/components/ui/checkbox";
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

const MAX_IMAGE_SIZE = 5242880; // 5 MB
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

const ameneties = [
  {
    id: "tv",
    label: "TV",
  },
  {
    id: "fridge",
    label: "Fridge",
  },
  {
    id: "kitchen",
    label: "Kitchen",
  },
  {
    id: "wifi",
    label: "WiFi",
  },
  {
    id: "washingm_machine",
    label: "Washing Machine",
  },
  {
    id: "ac",
    label: "AC",
  },
  {
    id: "power_backup",
    label: "Power Backup",
  },
  {
    id: "cook",
    label: "Cook",
  },
  {
    id: "parking",
    label: "Parking",
  },
] as const;

const roommateRequiredFormSchema = z.object({
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
  images: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, `Required`)
    .refine((files) => files.length <= 5, `Maximum of 5 images are allowed.`)
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
      `Each file size should be less than 5 MB.`
    )
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ALLOWED_IMAGE_TYPES.includes(file.type)
        ),
      "Only these types are allowed .jpg, .jpeg, .png and .webp"
    ),
  allow_teams: z.boolean().default(false),
  amenities: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

type RoommateRequiredFormValues = z.infer<typeof roommateRequiredFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<RoommateRequiredFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
  amenities: ["extra"],
};

export default function RoommateRequiredForm() {
  const form = useForm<RoommateRequiredFormValues>({
    resolver: zodResolver(roommateRequiredFormSchema),
    defaultValues,
  });

  const router = useRouter();

  const onSubmit = async (data: RoommateRequiredFormValues) => {
    try {
      const response = await fetch("/api/listings/roommate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const listingId = (await response.json())[0].listing_id;
      const responseUrl = new URL(response.url);
      const supabase = createClient();

      const imagesArray = Array.from(data.images);
      for (const image of imagesArray) {
        const { error } = await supabase.storage
          .from("listing-images-bucket")
          .upload(`${listingId}/${image.name}`, image);

        if (error) {
          console.error(error);
        }
      }

      // redirect to the next page
      router.push(`${responseUrl.origin}/home`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <Messages />
          <div className="grid grid-cols-1 md:grid-cols-2  ">
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
                        <option value="pimpri-chinchwad">
                          Pimpri-Chinchwad
                        </option>
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
            name="images"
            render={({ field: { onChange }, ...field }) => {
              return (
                <FormItem>
                  <FormLabel className=" ">Images</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center w-full  ">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <Input
                          type="file"
                          id="dropzone-file"
                          accept="image/*"
                          className="hidden"
                          multiple={true}
                          disabled={form.formState.isSubmitting}
                          {...field}
                          onChange={(event) => onChange(event.target.files)}
                        />
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="allow_teams"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5 ">
                  <FormLabel className="text-base">Allow teams?</FormLabel>
                  <FormDescription>
                    Let other people send you requests to join your team and
                    find rooms together.
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
            name="amenities"
            render={() => (
              <FormItem>
                <div className="mb-4  ">
                  <FormLabel className="text-base">Ameneties</FormLabel>
                  <FormDescription>
                    Select the amenities included with your room.
                  </FormDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2  ">
                  {ameneties.map((amenity) => (
                    <FormField
                      key={amenity.id}
                      control={form.control}
                      name="amenities"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={amenity.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(amenity.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        amenity.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== amenity.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {amenity.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  {/* HACK: Fix to deal with no default selected error */}
                  <FormField
                    key="extra"
                    control={form.control}
                    name="amenities"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key="extra"
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl className="hidden">
                            <Checkbox
                              checked={field.value?.includes("extra")}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, "extra"])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== "extra"
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal hidden">
                            Extra
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" ">Description</FormLabel>
                <FormControl>
                  <Textarea
                    className=" "
                    placeholder="I am looking for a roommate for my room."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className=" ">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
