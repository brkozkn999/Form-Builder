import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs';
import { JsonForms, userResponses } from '@/configs/schema';
import { and, eq } from 'drizzle-orm';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Edit, Share, Trash } from 'lucide-react';
import Link from 'next/link';
import { RWebShare } from 'react-web-share';

function FormListItem({ formRecord, jsonForm, refreshData }) {
    const { user } = useUser();

    const onDeleteForm = async () => {
        // First, delete related records from userResponses
        await db.delete(userResponses)
            .where(eq(userResponses.formRef, formRecord.id));

        // Then, delete the record from JsonForms
        const result = await db.delete(JsonForms)
            .where(and(eq(JsonForms.id, formRecord.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));

        if (result) {
            toast('Form Deleted!');
            refreshData();
        }
    }

    return (
        <div className='border shadow-md rounded-lg p-4'>
            <div className='flex justify-between'>
                <h2></h2>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Trash className='h-5 w-5 text-red-600 cursor-pointer hover:scale-105 transition-all' />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDeleteForm()}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <h2 className='text-lg'>{jsonForm?.formTitle}</h2>
            <h2 className='text-sm text-gray-500'>{jsonForm?.formHeading}</h2>
            <hr className='my-4' />
            <div className='flex justify-between'>
            <RWebShare
                data={{
                text: jsonForm?.formTitle + ", Build your form in seconds with AI form builder!",
                url: process.env.NEXT_PUBLIC_BASE_URL + "/aiform/" + formRecord?.id,
                title: jsonForm?.formHeading,
                }}>
                <Button variant='outline' size='sm' className='flex gap-2'><Share className='h-5 w-5' />Share</Button>
            </RWebShare>
                <Link href={'/edit-form/' + formRecord?.id}>
                    <Button className='flex gap-2' size='sm'><Edit className='h-5 w-5' />Edit</Button>
                </Link>
            </div>
        </div>
    );
}

export default FormListItem;
