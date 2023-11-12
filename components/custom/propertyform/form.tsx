import React from 'react'
import { z } from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';

const FormSchema = z.object({
    address: z
    .string({
        required_error: "Address is required"
    }),
    street: z
    .string({
        required_error: "Please enter street name"
    }),
    landmark: z
    .string(),
    city: z.enum(
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
      "solapur"
        ],
        {
            invalid_type_error: "Select a city",
            required_error: "Please select a city.",
          }
    ),
    state: z.enum(
        [
            "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
        ],
        {
            invalid_type_error: "Select a city",
            required_error: "Please select a city.",
        }

    ),
    price: z.bigint({
        required_error: "Please enter a valid price for your property"
    }),
    images: z.any({
        required_error: "Please upload images of your property"
    })
});

type PropertyFormValues = z.infer<typeof FormSchema>;

const PropertyForm = () => {

    const form = useForm<PropertyFormValues>({
        resolver: zodResolver(FormSchema),
        
    });

  return (
    <div>
        <Form {...form}>
            
        </Form>
    </div>
  )
}

export default PropertyForm
