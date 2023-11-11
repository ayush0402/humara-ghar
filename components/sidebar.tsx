"use client";

import { cn } from '@/lib/utils';
import {Home , Plus, Settings,Rocket, Folder, Bookmark, GitFork, Trash2, Info, Building2, Building, Divide, Contact2, PlusIcon} from 'lucide-react'
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { usePathname , useRouter} from 'next/navigation';
import { Button } from './ui/button';
//import { useRouter } from 'next/router';


const font = Poppins({
    weight: "600",
    subsets: ["latin"]
});
export const Sidebar = () =>{
    const pathname = usePathname();
    const router=useRouter();
    const routes =[
        {
            icon: Home,
            href: "/home",
            label: "Home",
            pro: false
        },
        {
            icon: Building2,
            href: "/owner/dashboard",
            label: "My Properties",
            pro: true
        },
        {
            icon: Building,
            href: "/room",
            label: "Find a room",
            pro:false
        },
        {
            icon: Contact2,
            href: "/roommate",
            label: "Find a roommate",
            pro:false
        },
        {
            icon: PlusIcon,
            href: "/owner/create",
            label: "List a property",
            pro: false,
        },
        {
            icon: Settings,
            href: "/settings",
            label: "Settings",
            pro: false
        },

    ];

    const onNavigate = (url: string , pro: boolean) => {
        return router.push(url);
    }
    

    return (
        <div className="space-y-4 flex-none w-[250px] flex-col h-full text-primary bg-secondary">
            <div >
                <div className='ml-5 mt-5 mb-7'>
                <Link href="/">
                    <h1 className={cn("hidden md:block text-xl md:text-3xl font-bold text-primary", 
                    font.className
                    )}>
                        humaraghar
                    </h1>
                </Link>
                </div>
                <div className="space-y-1 ">
                    {routes.map((route)=> (
                        <div
                         onClick={() => onNavigate(route.href , route.pro)}
                        key={route.href} className={cn(
                            "text-muted-foreground text-sm group flex pt-3 pb-3 w-full items-start  font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                            pathname === route.href && "bg-primary/10 text-primary"
                        )}>
                            <div className="flex ml-5 space-x-4 gap-y-2 items-center flex-1 ">
                                <div>
                                <route.icon className="h-6 w-6"/>
                                </div>
                                <div>
                                {route.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='ml-5 mt-[300px]'>
                    <Button>Log out</Button>
                </div>
            </div>
        </div>
    )
}