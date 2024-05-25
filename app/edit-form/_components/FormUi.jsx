import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import FieldEdit from './FieldEdit';
import { db } from '@/configs';
import { userResponses } from '@/configs/schema';
import moment from 'moment';
import { toast } from 'sonner';
import { SignInButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

function FormUi({ jsonForm, onFieldUpdate, deleteField, selectedTheme, selectedStyle, editable = true, formId = 0 }) {

    const { user, isSignedIn } = useUser();
    const [formData, setFormData] = useState({});
    let formRef = useRef();
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSelectChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleCheckbox = (fieldName, itemName, value) => {
        const list = formData?.[fieldName] ? formData?.[fieldName] : [];
        if (value) {
            list.push({
                label: itemName,
                value: value
            });
            setFormData({
                ...formData,
                [fieldName]: list
            });
        } else {
            const result = list.filter((item) => item.label !== itemName);
            setFormData({
                ...formData,
                [fieldName]: result
            });
        }
    }

    const onFormSubmit = async (event) => {
        event.preventDefault();  // Prevent form submission if user is not signed in
        if (isSignedIn) {
            console.log(formData);
    
            const result = await db.insert(userResponses).values({
                jsonResponse: formData,
                createdAt: moment().format('DD/MM/yyyy'),
                formRef: formId
            });
    
            if (result) {
                formRef.reset();
                toast('Response Submitted Successfully!');
            } else {
                toast('Error while saving!')
            }
        } else {
            toast('Please sign in first!');
        }
    }

    return (
        <form ref={(e) => formRef = e} onSubmit={onFormSubmit}
            className='border p-5 md:w-[600px] rounded-lg' data-theme={selectedTheme}
            style={{
                boxShadow: selectedStyle?.key === 'boxshadow' && '5px 5px 0px black',
                border: selectedStyle?.key === 'border' && selectedStyle.value
            }}>
            <h2 className='font-bold text-center text-2xl'>{jsonForm?.formTitle}</h2>
            <h2 className='text-sm text-gray-400 text-center'>{jsonForm?.formHeading}</h2>

            {jsonForm?.fields?.map((field, index) => (
                <div key={index} className='flex items-center gap-2'>
                    {field.fieldType === 'select' ?
                        <div className='my-3 w-full'>
                            <label className='text-xs text-gray-500'>{field.fieldLabel}</label>
                            <Select required={field?.required} onValueChange={(v) => handleSelectChange(field.fieldName, v)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={field.placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    {field.options.map((item, index) => (
                                        <SelectItem key={index} value={item}>{item}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        : field.fieldType === 'radio' ?
                            <div className='w-full my-3'>
                                <label className='text-xs text-gray-500'>{field.fieldLabel}</label>
                                <RadioGroup required={field?.required}>
                                    {field.options.map((item, index) => (
                                        <div className="flex items-center space-x-2" key={index}>
                                            <RadioGroupItem value={item.label} id={item.label}
                                                onClick={() => handleSelectChange(field.fieldName, item.label)} />
                                            <Label htmlFor={item.label}>{item.label}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                            : field.fieldType === 'checkbox' ?
                                <div className='my-3 w-full'>
                                    <label className='text-xs text-gray-500'>{field?.label}</label>
                                    {field?.options ? field?.options?.map((item, index) => (
                                        <div className='flex gap-2 items-center' key={index}>
                                            <Checkbox required={field?.required}
                                                onCheckedChange={(v) => handleCheckbox(field?.label, item.label, v)} />
                                            <h2>{item.label}</h2>
                                        </div>
                                    ))
                                        :
                                        <div className='flex gap-2 items-center'>
                                            <Checkbox required={field?.required} />
                                            <h2>{field.label}</h2>
                                        </div>
                                    }
                                </div>
                                : field.fieldType === 'tel' ?
                                    <div className='w-full my-3'>
                                        {/* Tel input field handling here if needed */}
                                    </div>
                                    :
                                    <div className='my-3 w-full'>
                                        <label className='text-xs text-gray-500'>{field.fieldLabel}</label>
                                        <Input type={field.type} placeholder={field?.placeholder} name={field?.fieldName}
                                            onChange={(e) => handleInputChange(e)} required={field?.required} />
                                    </div>
                    }
                    {editable &&
                        <div>
                            <FieldEdit defaultValue={field} onUpdate={(value) => {
                                onFieldUpdate(value, index)
                            }} deleteField={() => deleteField(index)} />
                        </div>
                    }
                </div>
            ))}
            {!isSignedIn ? (
                <Button type="button">
                    <SignInButton mode='modal'>Sign In first!</SignInButton>
                </Button>
            ) : (
                <button type='submit' className='btn btn-primary'>Submit</button>
            )}
        </form>
    );
}

export default FormUi;