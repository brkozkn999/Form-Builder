'use client'
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import FormResponseListItem from './_components/FormResponseListItem';

function Responses() {
    const { user } = useUser();
    const [formList, setFormList] = useState([]);

    useEffect(() => {
        if (user) {
            getFormList();
        }
    }, [user]);

    const getFormList = async () => {
        const result = await db.select().from(JsonForms)
        .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(JsonForms.id));

        setFormList(result);
    };

    return (
        <div className='p-10'>
            <h2 className='font-bold text-3xl flex items-center justify-between'>
                Responses
            </h2>

            <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
                {formList.map((form, index) => {
                    return (
                        <div key={index}>
                            <FormResponseListItem
                                formRecord={form}
                                jsonForm={JSON.parse(form.jsonform)}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Responses;
