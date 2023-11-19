import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen bg-secondary text-muted-foreground ml-[10px]'>
    <div className="flex">
      {/* <div className='bg-primary h-[500px] w-[700px] text-black'>Images</div> */}
      <img src="https://picsum.photos/200" alt="" className='h-[500px] w-[700px]'/>
      <div className='flex-col ml-[20px]'>
      <div className='my-2'>Address</div>
      <div className='my-2'>Amenities</div>
      <div className='my-2'>Desc</div>
      <div className='my-2'>Type</div>
      <div className='my-2'>Rent</div>
      </div>
    </div>
      <div className='my-2'>
          <Button>Price Prediction</Button>
      </div>
    </div>
  )
}

export default page
