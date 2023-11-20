import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'

const MaleAvatar = () => {
  return (
    <div>
      <Avatar className='h-[150px] w-[150px]'>
        <AvatarImage src="/Male.jpg" />
      </Avatar>
    </div>
  )
}

export default MaleAvatar
