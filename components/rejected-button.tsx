import React from 'react'
import { Button } from './ui/button'
import { X } from 'lucide-react'

const RejectedButton = () => {
  return (
    <div>
      <Button variant="destructive" className='rounded-full'><X className='h-[15px] w-[15px] mr-[2px]'/>Rejected</Button>
    </div>
  )
}

export default RejectedButton
