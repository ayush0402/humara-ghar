import RoommateCard from '@/components/custom/roommate-card'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { AiOutlinePlus } from "react-icons/ai";

const page = () => {
    return (
        <div className='flex h-full w-full'>
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


            </div>
        <div className='mx-2 mr-[30px] my-2'>
            <Link
                href="/roommate/listing"
                className={buttonVariants({ variant: "default" })}
            >
                <AiOutlinePlus className="pr-2" size={20} /> Add Listing
            </Link>
        </div>
        </div>
    )
}

export default page
