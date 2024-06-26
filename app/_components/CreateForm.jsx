'use client'
import React, { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AiChatSession } from '@/configs/AIModel'
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import moment from 'moment'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const PROMPT = ', On the basis of description please give me form in JSON with formTitle, formHeading along with fieldName, FieldTitle, FieldType, Placeholder, label, required fields in Json format(do not put ```json at the start of it)';

function CreateForm() {
    const [openDialog, setOpenDialog] = useState(false);
    const [userInput, setUserInput] = useState();
    const [loading, setLoading] = useState();
    const {user} = useUser();
    const router = useRouter();

    const onCreateForm=async ()=>{
        setLoading(true);
        const result = await AiChatSession.sendMessage('Description:' + userInput + PROMPT);

        if (result.response.text()) {
            const resp = await db.insert(JsonForms)
            .values({
                jsonform:result.response.text(),
                createdBy:user?.primaryEmailAddress.emailAddress,
                createdAt:moment().format('DD/MM/yyyy')
            }).returning({id:JsonForms.id});

            if (resp[0].id) {
                router.push('/edit-form/' + resp[0].id)
            }

            setLoading(false);
        }
        setLoading(false);
    }

    return (
        <div>
            <Button onClick={()=> setOpenDialog(true)}>+ Create Form</Button>
                <Dialog open={openDialog}>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Create a New Form</DialogTitle>
                        <DialogDescription>
                            <Textarea onChange={(event)=>setUserInput(event.target.value)}
                            className='my-2' placeholder='Write description'/>
                            <div className='flex gap-2 my-3 justify-end'>
                                <Button variant='destructive' onClick={()=>setOpenDialog(false)}>Cancel</Button>
                                <Button disabled={loading} onClick={()=>onCreateForm()}>
                                {loading 
                                    ?
                                <Loader2 className='animate-spin'/>
                                    :
                                'Create'
                                }
                                </Button>
                            </div>
                        </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
        </div>
    )
}

export default CreateForm