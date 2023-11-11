import { Navbar } from '@/components/navbar-owner';
import { Sidebar } from '@/components/sidebar';
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
    <div className='ml-[300px] mt-[120px] hover:bg-primary/10 h-[150px] w-[150px] rounded '>
      <div className='mt-[20px]'>
       <PlusIcon className='h-10 w-10 text-muted-foreground ml-[55px]'/>
       <div className='text-muted-foreground mt-4 ml-5'>
         Add a property
       </div>
       </div>
    </div>
    </div>
  )
}

export default DashboardLayout;
