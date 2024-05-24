'use client'
import React, { useEffect, useState } from 'react';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { ArrowLeft, Share2, SquareArrowOutUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import FormUi from '../_components/FormUi';
import { toast } from 'sonner';
import Controller from '../_components/Controller';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RWebShare } from 'react-web-share';

function EditForm({ params }) {
    const { user } = useUser();
    const [jsonForm, setJsonForm] = useState({ fields: [] });
    const [updateTrigger, setUpdateTrigger] = useState();
    const [record, setRecord] = useState(null); 
    const route = useRouter();

    const [selectedTheme, setSelectedTheme] = useState('light');
    const [selectedBackground, setSelectedBackground] = useState();
    const [selectedStyle, setSelectedStyle] = useState();

    useEffect(() => {
        if (user) {
            getFormData();
        }
    }, [user]);

    const getFormData = async () => {
        const result = await db.select().from(JsonForms)
            .where(and(eq(JsonForms.id, params?.formId), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));

        setRecord(result[0]);
        setJsonForm(JSON.parse(result[0].jsonform));
        setSelectedBackground(result[0].background);
        setSelectedTheme(result[0].theme);
        setSelectedStyle(JSON.parse(result[0].style));
    };

    useEffect(() => {
        if (updateTrigger) {
            updateJsonFormInDb();
        }
    }, [updateTrigger]);

    const onFieldUpdate = (value, index) => {
        const updatedForm = { ...jsonForm };
        updatedForm.fields[index].fieldLabel = value.fieldLabel;
        updatedForm.fields[index].placeholder = value.placeholder;
        setJsonForm(updatedForm);
        setUpdateTrigger(Date.now());
    };

    const updateJsonFormInDb = async () => {
        const result = await db.update(JsonForms).set({
            jsonform: JSON.stringify(jsonForm)
        }).where(and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));

        toast('Updated Successfully!')
    };

    const onDeleteField = (indexToRemove) => {
        const updatedFields = jsonForm.fields.filter((_, index) => index !== indexToRemove);
        setJsonForm(prevForm => ({ ...prevForm, fields: updatedFields }));
        setUpdateTrigger(Date.now());
    };

    const handleBackClick = () => {
        if (route && route.back) {
            route.back();
        } else {
            window.history.back();
        }
    };

    const updateControllerFields=async(value, columnName) =>{
        const result = await db.update(JsonForms).set({
            [columnName]:value
        }).where(and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));
        
        toast('Updated Successfully!')
    }

    return (
        <div className='p-10'>
            <div className='flex justify-between items-center'>
                <h2 onClick={handleBackClick}
                    className='flex gap-2 items-center my-5 hover:font-bold cursor-pointer transition-all'>
                    <ArrowLeft />Back
                </h2>
                <div className='flex gap-2'>
                    <Link href={'/aiform/' + record?.id} target='_blank'>
                        <Button className='flex gap-2'><SquareArrowOutUpRight className='h-5 w-5'/> Live Preview</Button>
                    </Link>
                    <RWebShare
                        data={{
                        text: jsonForm?.formTitle + ", Build your form in seconds with AI form builder!",
                        url: process.env.NEXT_PUBLIC_BASE_URL + "/aiform/" + record?.id,
                        title: jsonForm?.formHeading,
                        }}
                        onClick={() => console.log("shared successfully!")}>
                            <Button className='flex gap-2 bg-green-600 hover:bg-green-700'><Share2 className='flex gap-2'/> Share</Button>
                    </RWebShare>
                </div>
            </div>
            <div className='grid md:grid-cols-3 gap-5'>
                <div className='p-5 border rounded-lg shadow-md'>
                    <Controller selectedTheme={(value)=>
                    {
                        updateControllerFields(value, 'theme')
                        setSelectedTheme(value)
                    }}
                    selectedBackground={(value)=>
                    {
                        updateControllerFields(value, 'background')
                        setSelectedBackground(value)
                    }}
                    selectedStyle={(value)=>
                    {
                        updateControllerFields(value, 'style')
                        setSelectedStyle(value)
                    }}
                    />
                    
                </div>
                <div className='md:col-span-2 border rounded-lg p-5 flex items-center justify-center'
                style={{backgroundImage:selectedBackground}}>
                    <FormUi jsonForm={jsonForm} onFieldUpdate={onFieldUpdate}
                    deleteField={onDeleteField} selectedTheme={selectedTheme}/>
                </div>
            </div>
        </div>
    );
}

export default EditForm;