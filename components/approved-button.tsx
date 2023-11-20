import React from 'react'
import { Button } from './ui/button'
import { Check } from 'lucide-react'

const ApprovedButton = () => {
  return (
    <div>
      <Button className='rounded-full'><Check className='h-[15px] w-[15px] mr-[2px]'/>Approved</Button>
    </div>
  )
}

export default ApprovedButton
