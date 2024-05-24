'use client'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

function Responses() {

    const {user} = useUser();
    const [formList, setFormList] = useState();

    useEffect(() => {
        user && getFormList();
    }, [])

    const getFormList=async()=>{
        const result = await db.select().from(JsonForms)
        .where(eq(JsonForms.createdBy, user?.primaryEmailAddress.emailAddress))

        setFormList(result);
    }
    return (
        <div className='p-10'>
            <h2 className='font-bold text-3xl flex items-center justify-between'>
                Responses
            </h2>

            <div>
                {formList.map((form, index)=>{
                    <div>
                        <h2>{form.formTitle}</h2>
                        <h2>{form.formHeading}</h2>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Responses