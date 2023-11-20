import React from 'react'

const ChatHeader = () => {
  return (
    <div className='bg-red'>
        <div className='h-[60px] w-full bg-primary/20 flex rounded'>
          <div className=''><img src="https://picsum.photos/200" alt="" className='ml-[10px] mt-[5px] h-[50px] w-[50px] rounded-full'/></div>
          <div className='ml-[10px] mt-[15px]'>name</div>
        </div>
    </div>
    
  )
}

export default ChatHeader
