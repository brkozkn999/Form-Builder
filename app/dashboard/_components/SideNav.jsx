'use client'
import { LibraryBig, LineChart  , MessageSquare, Shield } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/Progress'
import Link from 'next/link'
import { desc, eq } from 'drizzle-orm'
import { db } from '@/configs'
import { useUser } from '@clerk/nextjs'
import { JsonForms } from '@/configs/schema'

function SideNav() {
    const { user } = useUser();
    const [formList, setFormList] = useState([]);
    const path = usePathname();
    const [percFormCreated, setPercFormCreated] = useState(0);
    const menuList =[
        {
            id:0,
            name:'My Forms',
            icon:LibraryBig,
            path:'/dashboard'
        },
        {
            id:1,
            name:'Responses',
            icon:MessageSquare,
            path:'/dashboard/responses'
        },
        {
            id:2,
            name:'Upgrade',
            icon:Shield,
            path:'/dashboard/upgrade'
        },
    ]

    useEffect(()=>{
        user && getFormList();
    }, [user])

    const getFormList = async () => {
        const result = await db.select().from(JsonForms)
        .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(JsonForms.id));

        setFormList(result);
        const perc = (result.length / 4) * 100;
        setPercFormCreated(perc);
    };

    return (
        <div className='h-screen shadow-md border'>
        <div className='p-5'>
            {menuList.map((menu, index) => (
                <Link href={menu.path}
                    key={index}
                    className={`flex items-center gap-3 p-4 mb-3
                        hover:bg-primary hover:text-white rounded-lg
                        cursor-pointer
                        ${path === menu.path ? 'bg-primary text-white' : 'text-gray-500'}
                    `}>
                    <menu.icon />
                    {menu.name}
                </Link>
            ))}
        </div>
            <div className='fixed bottom-7 p-6 w-64'>
                <Button className='w-full'>+ Create Form</Button>
                <div className='my-7'>
                    <Progress value={percFormCreated} />
                    <h2 className='text-sm mt-2 text-gray-600'><strong>{formList.length} </strong>out of 4 file created</h2>
                    <h2 className='text-xs mt-3 text-gray-600'>Upgrade your plan for unlimited AI form build</h2>
                </div>
            </div>
        </div>
    )
}

export default SideNav