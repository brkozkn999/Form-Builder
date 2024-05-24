import React, { useState, useEffect } from 'react';
import { Trash, Edit } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
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
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function FieldEdit({ defaultValue, onUpdate, deleteField }) {
    const [fieldLabel, setFieldLabel] = useState(defaultValue?.fieldLabel);
    const [placeholder, setPlaceholder] = useState(defaultValue?.placeholder);

    useEffect(() => {
        if (defaultValue) {
            setFieldLabel(defaultValue.fieldLabel);
            setPlaceholder(defaultValue.placeholder);
        }
    }, [defaultValue]);

    return (
        <div className='flex gap-2'>
            <Popover>
                <PopoverTrigger><Edit className='h-5 w-5 text-gray-500' /></PopoverTrigger>
                <PopoverContent>
                    <h2>Edit Fields</h2>
                    <div>
                        <label className='text-xs'>Label Name</label>
                        <Input type='text' value={fieldLabel} onChange={(e) => setFieldLabel(e.target.value)} />
                    </div>
                    <div>
                        <label className='text-xs'>Placeholder</label>
                        <Input type='text' value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} />
                    </div>
                    <Button size='sm' className='mt-3 w-full'
                        onClick={() => onUpdate({
                            fieldLabel: fieldLabel,
                            placeholder: placeholder
                        })}>
                        Update
                    </Button>
                </PopoverContent>
            </Popover>

            <AlertDialog>
                    <AlertDialogTrigger><Trash className='h-5 w-5 text-red-500'/></AlertDialogTrigger>
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
                        <AlertDialogAction onClick={() => deleteField()}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default FieldEdit;
