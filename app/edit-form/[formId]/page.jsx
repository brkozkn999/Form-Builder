'use client'
import React, { useEffect, useState } from 'react';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import FormUi from '../_components/FormUi';
import { toast } from 'sonner';

function EditForm({ params }) {
    const { user } = useUser();
    const [jsonForm, setJsonForm] = useState({ fields: [] }); // Ensure jsonForm has a fields array
    const [updateTrigger, setUpdateTrigger] = useState();
    const [record, setRecord] = useState(null); // Initialize as null
    const route = useRouter();

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
            jsonform: JSON.stringify(jsonForm)  // Ensure the jsonform is stored as a string
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

    return (
        <div className='p-10'>
            <h2 onClick={handleBackClick}
                className='flex gap-2 items-center my-5 hover:font-bold cursor-pointer transition-all'>
                <ArrowLeft />Back
            </h2>
            <div className='grid md:grid-cols-3 gap-5'>
                <div className='p-5 border rounded-lg shadow-md'>
                    Controller
                </div>
                <div className='md:col-span-2 border rounded-lg p-5 flex items-center justify-center'>
                    <FormUi jsonForm={jsonForm} onFieldUpdate={onFieldUpdate} deleteField={onDeleteField} />
                </div>
            </div>
        </div>
    );
}

export default EditForm;