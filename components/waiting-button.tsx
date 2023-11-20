import React from 'react'
import { Button } from './ui/button'
import { AlarmClock } from 'lucide-react'

const WaitingButton = () => {
  return (
    <div>
      <Button className='rounded-full bg-yellow-500 hover:bg-yellow-400'><AlarmClock className='h-[15px] w-[15px] mr-[2px]'/>Waiting</Button>
    </div>
  )
}

export default WaitingButton
