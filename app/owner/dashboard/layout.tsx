import { Navbar } from '@/components/navbar-owner';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import React from 'react'

const DashboardLayout = ({
    children
} : {
    children: React.ReactNode;
}) => {
  return (
    <div className='h-full w-full bg-secondary'>
    <div className='hidden items-start md:flex mt-0 w-200 ml-0 flex-col fixed inset-y-0 h-full '>
        <Sidebar/>
        <Navbar/> 
    </div>
    <div className='ml-[300px] mt-[120px]'>
      <Button variant="secondary" className='h-[150px] w-[150px] hover:bg-primary/10 flex-col justify-evenly text-muted-foreground'>
          <PlusIcon className='h-10 w-10'/>
           Add a property
        </Button>
    </div>
    </div>
  )
}

export default DashboardLayout;
