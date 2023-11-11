import { Navbar } from '@/components/navbar-owner';
import { Sidebar } from '@/components/sidebar';
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
    </div>
  )
}

export default DashboardLayout;
