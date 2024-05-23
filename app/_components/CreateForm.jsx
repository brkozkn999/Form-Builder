'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/Button"
import { Textarea } from "@/components/ui/textarea"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const PROMPT = 'On the basis of description please give me form in json with form title, form subheading, form field form name, placeholder name, and form label in Json format';

function CreateForm() {
    const [openDialog, setOpenDialog] = useState(false);
    const [userInput, setUserInput] = useState();
    /*
    const onCreateForm=async ()=>{
        const result = await AiChatSession.model.sendMessage('Description:' + userInput + PROMPT);
        console.log(result.response.text());
    }
    */

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
                                <Button variant='destructive' onClick={()=>setOpenDialog(falseg)}>Cancel</Button>
                                <Button onClick={()=>onCreateForm()}>Create</Button>
                            </div>
                        </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
        </div>
    )
}

export default CreateForm