import { FC } from 'react';
import { notFound } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import ChatHeader from '@/components/custom/chat-header';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import PropertyDisplay from '@/components/custom/property-display';



const Page = async ({params}) => {
  
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const propertyId =  params.slug;

  const {data: properties} = await supabase
  .from("property_listings")
  .select("*")
  .eq('listing_id',propertyId)
  
  return (
    <div className='ml-[10px]'>
      <PropertyDisplay 
         imageSrc="https://picsum.photos/200"
         location={properties[0].location}
         locality={properties[0].locality}
         area={properties[0].area}
         bhk={properties[0].bhk}
         bathroom={properties[0].bathroom}
         rentAmount={properties[0].approx_rent}
         address={properties[0].address}
         />
    </div>
  )
};

export default Page;
