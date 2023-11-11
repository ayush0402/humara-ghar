import { Navbar } from '@/components/navbar-owner';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import React from 'react'
const page = () => {
  
  return (
    <div>
    <Button variant="secondary" className='h-[200px] w-[200px] hover:bg-primary/10 flex-col justify-evenly text-muted-foreground'>
          <PlusIcon className='h-10 w-10'/>
           Add a property
    </Button>
    </div>
  )
}

export default page
