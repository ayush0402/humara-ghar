"use client";

import { redirect, useRouter } from "next/navigation";
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
import { AlertDialogHeader, AlertDialogTitle, AlertDialog, AlertDialogContent, AlertDialogTrigger, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "../ui/alert-dialog";
import { ScrollArea } from "../ui/scroll-area";

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

const propertyRequiredFormSchema = z.object({
  available_date: z.date({
    required_error: "A date is required.",
  }),
  rent: z.string({
    required_error: "Please enter your rent.",
  }),
  address: z.string({
    required_error: "Address is required"
  }),
  locality: z.enum(
    [
      "adambakkam",
      "adyar, sardar patel road",
      "ajmera bhakti park, bhakti park",
      "ambattur",
      "amberpet",
      "anakaputhur",
      "andheri east",
      "andheri west",
      "anna nagar",
      "arjun nagar, safdarjung enclave",
      "arumbakkam",
      "ashok nagar",
      "attapur",
      "auris serenity, kanch pada",
      "baghajatin",
      "baguiati",
      "banaswadi",
      "bandlaguda jagir",
      "bandra west",
      "banjara hills, nh 9",
      "bansdroni",
      "baranagar",
      "beeramguda, ramachandra puram, nh 9",
      "begumpet",
      "behala",
      "birati",
      "boduppal, nh 2 2",
      "bolarum, medchal road",
      "bommanahalli",
      "btm layout",
      "c v raman nagar",
      "chanda nagar",
      "chandivali",
      "chembur",
      "chhattarpur",
      "chhattarpur enclave",
      "choolaimedu",
      "chromepet, gst road",
      "defence colony",
      "dum dum",
      "dum dum metro",
      "electronic city",
      "electronic city phase 2, electronic city",
      "electronics city phase 1, electronic city",
      "gachibowli",
      "garia",
      "garia station, garia",
      "ghatkopar west",
      "goregaon west",
      "gottigere",
      "hafeezpet, nh 9",
      "hayathnagar, nh 9",
      "hebbal",
      "himayath nagar, nh 7",
      "horamavu",
      "iyyappanthangal",
      "j p nagar",
      "jvpd scheme",
      "jadavpur",
      "janakpuri",
      "jp nagar phase 7, j p nagar",
      "jubilee hills",
      "k r puram",
      "kaggadasapura, indira nagar",
      "kaikhali",
      "kalkaji",
      "kanakapura road",
      "kandivali west",
      "kapra",
      "kasba",
      "kelambakkam, old mahabalipuram road",
      "keshtopur",
      "khar west",
      "kodambakkam",
      "kolathur",
      "kompally",
      "kondapur",
      "koramangala",
      "korattur, jawaharlal nehru road",
      "kothapet",
      "kukatpally, nh 9",
      "l&t emerald isle, powai",
      "lb nagar, nh 9",
      "lajpat nagar",
      "lajpat nagar 4",
      "laxmi nagar",
      "madambakkam",
      "madhapur",
      "madipakkam",
      "mahadevapura",
      "mahindra world city",
      "malviya nagar",
      "mambalam west",
      "mangadu",
      "manikonda, outer ring road",
      "mathikere",
      "medavakkam",
      "mehdipatnam",
      "mehrauli",
      "miyapur, nh 9",
      "mugalivakkam",
      "mulund west",
      "murugeshpalya, airport road",
      "mylapore",
      "nagole",
      "najafgarh",
      "nallagandla, serilingampally",
      "narsingi, outer ring road",
      "nizampet",
      "old bowenpally",
      "old mahabalipuram road",
      "padmanabha nagar",
      "padur, old mahabalipuram road",
      "pallikaranai",
      "pammal",
      "paschim vihar",
      "perambur",
      "perumbakkam",
      "perungalathur, chennai bypass road",
      "pitampura",
      "porur",
      "pragathi nagar, kukatpally",
      "purasawalkam, ph road",
      "rajajinagar",
      "rajendra nagar, outer ring road",
      "rajouri garden",
      "ramamurthy nagar",
      "rampally",
      "rohini sector 24",
      "safdarjung enclave",
      "sainikpuri",
      "saket",
      "salt lake city",
      "salt lake city sector 1",
      "salt lake city sector 2",
      "salt lake city sector 5",
      "santacruz west",
      "santoshpur",
      "selaiyur",
      "seven bungalows",
      "shapoorji pallonji vicinia, chandivali",
      "sholinganallur",
      "sodepur",
      "somajiguda, nh 9",
      "t nagar",
      "tambaram, gst road",
      "thakurpukur",
      "thiruvanmiyur",
      "thoraipakkam",
      "toli chowki",
      "uppal, nh 2 2",
      "urapakkam, vandalur r.f, gst road",
      "uttam nagar",
      "vadapalani",
      "valasaravakkam, arcot road",
      "vanasthalipuram, nh 9",
      "vasant kunj",
      "velachery",
      "vijayanagar",
      "virugambakkam",
      "worli",
      "yelahanka",
      "yeshwantpur",
      "whitefield"
    ],
    {
      invalid_type_error: "Select a city",
      required_error: "Please select a city.",
    }
  ),
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
  area: z
    .string(),
  bathroom: z
    .string(),
  bhk: z.enum([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6'
  ])


});

type PropertyRequiredFormValues = z.infer<typeof propertyRequiredFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<PropertyRequiredFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
  amenities: ["extra"],
};

export default function PropertyRequiredForm() {
  const form = useForm<PropertyRequiredFormValues>({
    resolver: zodResolver(propertyRequiredFormSchema),
    defaultValues,
  });

  const router = useRouter();

  const onSubmit = async (data: PropertyRequiredFormValues) => {
    try {
      const response = await fetch("/api/listings/property", {
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
      redirect("/property");
      router.push(`${responseUrl.origin}/home`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-full ml-[5px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <Messages />
          <div className="grid grid-cols-1 md:grid-cols-2  ">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" ">Address</FormLabel>
                  <FormControl>
                    <Textarea
                      className=" "
                      placeholder="Address of your property"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Locality</FormLabel>
                  <div className="relative w-max">
                    <FormControl>
                      <select
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "w-[200px] appearance-none bg-transparent font-normal"
                        )}
                        {...field}
                      >
                        <option value="adambakkam">Adambakkam</option>
                        <option value="adyar, sardar patel road">Adyar, Sardar Patel Road</option>
                        <option value="ajmera bhakti park, bhakti park">Ajmera Bhakti Park, Bhakti Park</option>
                        <option value="ambattur">Ambattur</option>
                        <option value="amberpet">Amberpet</option>
                        <option value="anakaputhur">Anakaputhur</option>
                        <option value="andheri east">Andheri East</option>
                        <option value="andheri west">Andheri West</option>
                        <option value="anna nagar">Anna Nagar</option>
                        <option value="arjun nagar, safdarjung enclave">Arjun Nagar, Safdarjung Enclave</option>
                        <option value="arumbakkam">Arumbakkam</option>
                        <option value="ashok nagar">Ashok Nagar</option>
                        <option value="attapur">Attapur</option>
                        <option value="auris serenity, kanch pada">Auris Serenity, Kanch Pada</option>
                        <option value="baghajatin">Baghajatin</option>
                        <option value="baguiati">Baguiati</option>
                        <option value="banaswadi">Banaswadi</option>
                        <option value="bandlaguda jagir">Bandlaguda Jagir</option>
                        <option value="bandra west">Bandra West</option>
                        <option value="banjara hills, nh 9">Banjara Hills, NH 9</option>
                        <option value="bansdroni">Bansdroni</option>
                        <option value="baranagar">Baranagar</option>
                        <option value="beeramguda, ramachandra puram, nh 9">Beeramguda, Ramachandra Puram, NH 9</option>
                        <option value="begumpet">Begumpet</option>
                        <option value="behala">Behala</option>
                        <option value="birati">Birati</option>
                        <option value="boduppal, nh 2 2">Boduppal, NH 2 2</option>
                        <option value="bolarum, medchal road">Bolarum, Medchal Road</option>
                        <option value="bommanahalli">Bommanahalli</option>
                        <option value="btm layout">BTM Layout</option>
                        <option value="c v raman nagar">C V Raman Nagar</option>
                        <option value="chanda nagar">Chanda Nagar</option>
                        <option value="chandivali">Chandivali</option>
                        <option value="chembur">Chembur</option>
                        <option value="chhattarpur">Chhattarpur</option>
                        <option value="chhattarpur enclave">Chhattarpur Enclave</option>
                        <option value="choolaimedu">Choolaimedu</option>
                        <option value="chromepet, gst road">Chromepet, GST Road</option>
                        <option value="defence colony">Defence Colony</option>
                        <option value="dum dum">Dum Dum</option>
                        <option value="dum dum metro">Dum Dum Metro</option>
                        <option value="electronic city">Electronic City</option>
                        <option value="electronic city phase 2, electronic city">Electronic City Phase 2, Electronic City</option>
                        <option value="electronics city phase 1, electronic city">Electronics City Phase 1, Electronic City</option>
                        <option value="gachibowli">Gachibowli</option>
                        <option value="garia">Garia</option>
                        <option value="garia station, garia">Garia Station, Garia</option>
                        <option value="ghatkopar west">Ghatkopar West</option>
                        <option value="goregaon west">Goregaon West</option>
                        <option value="gottigere">Gottigere</option>
                        <option value="hafeezpet, nh 9">Hafeezpet, NH 9</option>
                        <option value="hayathnagar, nh 9">Hayathnagar, NH 9</option>
                        <option value="hebbal">Hebbal</option>
                        <option value="himayath nagar, nh 7">Himayath Nagar, NH 7</option>
                        <option value="horamavu">Horamavu</option>
                        <option value="iyyappanthangal">Iyyappanthangal</option>
                        <option value="j p nagar">J P Nagar</option>
                        <option value="jvpd scheme">JVPD Scheme</option>
                        <option value="jadavpur">Jadavpur</option>
                        <option value="janakpuri">Janakpuri</option>
                        <option value="jp nagar phase 7, j p nagar">JP Nagar Phase 7, J P Nagar</option>
                        <option value="jubilee hills">Jubilee Hills</option>
                        <option value="k r puram">K R Puram</option>
                        <option value="kaggadasapura, indira nagar">Kaggadasapura, Indira Nagar</option>
                        <option value="kaikhali">Kaikhali</option>
                        <option value="kalkaji">Kalkaji</option>
                        <option value="kanakapura road">Kanakapura Road</option>
                        <option value="kandivali west">Kandivali West</option>
                        <option value="kapra">Kapra</option>
                        <option value="kasba">Kasba</option>
                        <option value="kelambakkam, old mahabalipuram road">Kelambakkam, Old Mahabalipuram Road</option>
                        <option value="keshtopur">Keshtopur</option>
                        <option value="khar west">Khar West</option>
                        <option value="kodambakkam">Kodambakkam</option>
                        <option value="kolathur">Kolathur</option>
                        <option value="kompally">Kompally</option>
                        <option value="kondapur">Kondapur</option>
                        <option value="koramangala">Koramangala</option>
                        <option value="korattur, jawaharlal nehru road">Korattur, Jawaharlal Nehru Road</option>
                        <option value="kothapet">Kothapet</option>
                        <option value="kukatpally, nh 9">Kukatpally, NH 9</option>
                        <option value="l&t emerald isle, powai">L&T Emerald Isle, Powai</option>
                        <option value="lb nagar, nh 9">LB Nagar, NH 9</option>
                        <option value="lajpat nagar">Lajpat Nagar</option>
                        <option value="lajpat nagar 4">Lajpat Nagar 4</option>
                        <option value="laxmi nagar">Laxmi Nagar</option>
                        <option value="madambakkam">Madambakkam</option>
                        <option value="madhapur">Madhapur</option>
                        <option value="madipakkam">Madipakkam</option>
                        <option value="mahadevapura">Mahadevapura</option>
                        <option value="mahindra world city">Mahindra World City</option>
                        <option value="malviya nagar">Malviya Nagar</option>
                        <option value="mambalam west">Mambalam West</option>
                        <option value="mangadu">Mangadu</option>
                        <option value="manikonda, outer ring road">Manikonda, Outer Ring Road</option>
                        <option value="mathikere">Mathikere</option>
                        <option value="medavakkam">Medavakkam</option>
                        <option value="mehdipatnam">Mehdipatnam</option>
                        <option value="mehrauli">Mehrauli</option>
                        <option value="miyapur, nh 9">Miyapur, NH 9</option>
                        <option value="mugalivakkam">Mugalivakkam</option>
                        <option value="mulund west">Mulund West</option>
                        <option value="murugeshpalya, airport road">Murugeshpalya, Airport Road</option>
                        <option value="mylapore">Mylapore</option>
                        <option value="nagole">Nagole</option>
                        <option value="najafgarh">Najafgarh</option>
                        <option value="nallagandla, serilingampally">Nallagandla, Serilingampally</option>
                        <option value="narsingi, outer ring road">Narsingi, Outer Ring Road</option>
                        <option value="nizampet">Nizampet</option>
                        <option value="old bowenpally">Old Bowenpally</option>
                        <option value="old mahabalipuram road">Old Mahabalipuram Road</option>
                        <option value="padmanabha nagar">Padmanabha Nagar</option>
                        <option value="padur, old mahabalipuram road">Padur, Old Mahabalipuram Road</option>
                        <option value="pallikaranai">Pallikaranai</option>
                        <option value="pammal">Pammal</option>
                        <option value="paschim vihar">Paschim Vihar</option>
                        <option value="perambur">Perambur</option>
                        <option value="perumbakkam">Perumbakkam</option>
                        <option value="perungalathur, chennai bypass road">Perungalathur, Chennai Bypass Road</option>
                        <option value="pitampura">Pitampura</option>
                        <option value="porur">Porur</option>
                        <option value="pragathi nagar, kukatpally">Pragathi Nagar, Kukatpally</option>
                        <option value="purasawalkam, ph road">Purasawalkam, PH Road</option>
                        <option value="rajajinagar">Rajajinagar</option>
                        <option value="rajendra nagar, outer ring road">Rajendra Nagar, Outer Ring Road</option>
                        <option value="rajouri garden">Rajouri Garden</option>
                        <option value="ramamurthy nagar">Ramamurthy Nagar</option>
                        <option value="rampally">Rampally</option>
                        <option value="rohini sector 24">Rohini Sector 24</option>
                        <option value="safdarjung enclave">Safdarjung Enclave</option>
                        <option value="sainikpuri">Sainikpuri</option>
                        <option value="saket">Saket</option>
                        <option value="salt lake city">Salt Lake City</option>
                        <option value="salt lake city sector 1">Salt Lake City Sector 1</option>
                        <option value="salt lake city sector 2">Salt Lake City Sector 2</option>
                        <option value="salt lake city sector 5">Salt Lake City Sector 5</option>
                        <option value="santacruz west">Santacruz West</option>
                        <option value="santoshpur">Santoshpur</option>
                        <option value="selaiyur">Selaiyur</option>
                        <option value="seven bungalows">Seven Bungalows</option>
                        <option value="shapoorji pallonji vicinia, chandivali">Shapoorji Pallonji Vicinia, Chandivali</option>
                        <option value="sholinganallur">Sholinganallur</option>
                        <option value="sodepur">Sodepur</option>
                        <option value="somajiguda, nh 9">Somajiguda, NH 9</option>
                        <option value="t nagar">T Nagar</option>
                        <option value="tambaram, gst road">Tambaram, GST Road</option>
                        <option value="thakurpukur">Thakurpukur</option>
                        <option value="thiruvanmiyur">Thiruvanmiyur</option>
                        <option value="thoraipakkam">Thoraipakkam</option>
                        <option value="toli chowki">Toli Chowki</option>
                        <option value="uppal, nh 2 2">Uppal, NH 2 2</option>
                        <option value="urapakkam, vandalur r.f, gst road">Urapakkam, Vandalur R.F, GST Road</option>
                        <option value="uttam nagar">Uttam Nagar</option>
                        <option value="vadapalani">Vadapalani</option>
                        <option value="valasaravakkam, arcot road">Valasaravakkam, Arcot Road</option>
                        <option value="vanasthalipuram, nh 9">Vanasthalipuram, NH 9</option>
                        <option value="vasant kunj">Vasant Kunj</option>
                        <option value="velachery">Velachery</option>
                        <option value="vijayanagar">Vijayanagar</option>
                        <option value="virugambakkam">Virugambakkam</option>
                        <option value="worli">Worli</option>
                        <option value="yelahanka">Yelahanka</option>
                        <option value="yeshwantpur">Yeshwantpur</option>
                        <option value="whitefield">Whitefield</option>

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
              name="area"
              render={({ field }) => (
                <FormItem className="w-max mt-5">
                  <FormLabel>Area in sqft</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bhk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>BHK</FormLabel>
                  <div className="relative w-max">
                    <FormControl>
                      <select
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "w-[200px] appearance-none bg-transparent font-normal"
                        )}
                        {...field}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>

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
              name="bathroom"
              render={({ field }) => (
                <FormItem className="w-max mt-5">
                  <FormLabel>Number of Bathrooms</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input placeholder="Enter" {...field} />
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
                    placeholder="Additional details about your property"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="h-[200px] w-[350px] rounded-md border overflow-auto my-2">
          <AlertDialog >
            <AlertDialogTrigger asChild><Button variant="outline">Terms&Conditions</Button></AlertDialogTrigger>
            <AlertDialogContent className={"lg:max-w-screen-lg max-h-screen"}>
              <AlertDialogHeader>
                <AlertDialogTitle>Terms and Conditions for Property Listings</AlertDialogTitle>
                <AlertDialogDescription>
                  <div className="overflow-auto">
                  <div>
                    <p>
                      These terms and conditions ("Terms") govern the use of our property listing services ("Services") provided by [Your Company Name] ("we," "us," or "our"). By using our Services, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
                    </p>
                  </div>
                  <div>
                    <h2>1. Property Listing</h2>
                    <p>1.1. By submitting a property listing, you represent and warrant that all information provided is accurate, complete, and up-to-date.</p>
                    <p>1.2. We reserve the right to review and verify the information provided in property listings. If we determine, in our sole discretion, that a property listing is not valid, we may take actions as outlined in Section 2.</p>
                  </div>

                  <div>
                    <h2>2. Actions Against Invalid Listings</h2>
                    <p>2.1. If we find that a property listing is not valid for any reason, including but not limited to false information, misleading details, or violation of applicable laws, we may take the following actions:</p>
                    <ul>
                      <li>a. Listing Removal: We may remove the invalid property listing from our platform.</li>
                      <li>b. Account Suspension: We may suspend the account of the user who submitted the invalid property listing.</li>
                      <li>c. Legal Action: In cases of serious violations, we reserve the right to take legal action against the user, seeking damages or injunctive relief.</li>
                    </ul>
                  </div>

                  <div>
                    <h2>3. User Responsibilities</h2>
                    <p>3.1. Users are responsible for ensuring the accuracy and validity of the information provided in property listings.</p>
                    <p>3.2. Users agree not to submit listings that violate any applicable laws, regulations, or third-party rights.</p>
                  </div>

                  <div>
                    <h2>4. Dispute Resolution</h2>
                    <p>4.1. Any disputes arising from the interpretation or enforcement of these Terms shall be resolved through negotiation in good faith.</p>
                    <p>4.2. If a dispute cannot be resolved through negotiation, it shall be submitted to binding arbitration in accordance with the rules of [Arbitration Organization] before resorting to litigation.</p>
                  </div>

                  <div>
                    <h2>5. Changes to Terms</h2>
                    <p>5.1. We reserve the right to modify these Terms at any time. Users will be notified of any changes, and continued use of the Services after such notification constitutes acceptance of the modified Terms.</p>
                  </div>

                  <div>
                    <h2>6. Governing Law</h2>
                    <p>6.1. These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction].</p>
                  </div>

                  <div>
                    <h2>7. Contact Information</h2>
                    <p>7.1. For questions or concerns regarding these Terms, please contact us at [Your Contact Information].</p>
                  </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
            <Button type="submit" className="mx-2">
                  Submit
            </Button>
          </div>
          
        </form>
      </Form>

    </div>
  );
}
