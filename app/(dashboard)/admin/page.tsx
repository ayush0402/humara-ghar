import AdminPropertyCard from '@/components/property-card-admin';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react'

const page = async () => {
    const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {data: properties} = await supabase
  .from("property_listings")
  .select("*")
  .eq('status','0')

  if(user?.email=="lit2020016@iiitl.ac.in"||user?.email=="ayushkumar0402@gmail.com"){
  return (
    
    <div className='space-x-4 space-y-2'>
        <div className='flex flex-wrap'>
        {properties&&properties.map((property)=>(
      <AdminPropertyCard
        imageSrc= "https://picsum.photos/200"
        name={property.locality}
        location={property.location}
        rentAmount={property.approx_rent}
        area={property.area}
        bhk={property.bhk}
        bathroom={property.bathroom}
        listing_id={property.listing_id}
      />))}
      </div>
    </div>
    
  )}
  else{
    return(
        <div className='ml-[10px] text-muted-foreground text-3xl text-center mt-[350px]'>
            Unauthorized
        </div>
    )
  }
}

export default page
