import UserDisplay from '@/components/custom/user-display-card'
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import React from 'react'

const page = async ({params}) => {
    const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const UserId = params.slug;

  const { data: properties } = await supabase
    .from("property_listings")
    .select("*")
    .eq("listing_id", UserId);

  return (
    <div className='ml-5'>
      <UserDisplay
      Id={UserId}
      />
    </div>
  )
}

export default page
