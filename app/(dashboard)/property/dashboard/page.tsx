import RoommateCard from '@/components/custom/roommate-card';
import { Navbar } from '@/components/navbar-owner';
import PropertyCard from '@/components/property-card';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react'
const page = () => {
  
  return (
    <div className='flex space-x-4 space-y-2'>
      <div className='flex flex-wrap'>
      <RoommateCard
                    imageSrc="https://picsum.photos/200"
                    name="Listing Name"
                    location="Listing Location"
                    rentAmount={10000}
                    lookingForGender="male"
                    lookingForType="roommate"
                    matchPercentage={80}
                />
      <RoommateCard
                    imageSrc="https://picsum.photos/200"
                    name="Listing Name"
                    location="Listing Location"
                    rentAmount={10000}
                    lookingForGender="male"
                    lookingForType="roommate"
                    matchPercentage={80}
                />
      <RoommateCard
                    imageSrc="https://picsum.photos/200"
                    name="Listing Name"
                    location="Listing Location"
                    rentAmount={10000}
                    lookingForGender="male"
                    lookingForType="roommate"
                    matchPercentage={80}
                />
      <RoommateCard
                    imageSrc="https://picsum.photos/200"
                    name="Listing Name"
                    location="Listing Location"
                    rentAmount={10000}
                    lookingForGender="male"
                    lookingForType="roommate"
                    matchPercentage={80}
                />
      </div >
      <div className='mr-[40px]'>
    <Link href="/property/create"><Button variant="default" className='mr-[40px]'>
          <PlusIcon className='h-5 w-5'/>
           Add a property
    </Button></Link>
    </div>
    </div>
  )
}

export default page
