import React from 'react';
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

function FormUi({ jsonForm, onFieldUpdate, deleteField }) {

    return (
        <div className='border p-5 md:w-[600px] rounded-lg'>
            <h2 className='font-bold text-center text-2xl'>{jsonForm?.formTitle}</h2>
            <h2 className='text-sm text-gray-400 text-center'>{jsonForm?.formHeading}</h2>

            {jsonForm?.fields?.map((field, index) => (
                <div key={index} className='flex items-center gap-2'>
                    {field.fieldType == 'select' ?
                        <div className='my-3 w-full'>
                            <label className='text-xs text-gray-500'>{field.fieldLabel}</label>
                            <Select>
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
                        : field.fieldType == 'radio' ?
                            <div className='w-full my-3'>
                                <label className='text-xs text-gray-500'>{field.fieldLabel}</label>
                                <RadioGroup>
                                    {field.options.map((item, index) => (
                                        <div className="flex items-center space-x-2" key={index}>
                                            <RadioGroupItem value={item.label} id={item.label} />
                                            <Label htmlFor={item.label}>{item.label}</Label>
                                        </div>
                                    ))}
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="option-one" id="option-one" />
                                        <Label htmlFor="option-one">Option One</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            : field.fieldType == 'checkbox' ?
                                <div className='my-3 w-full'>
                                    <label className='text-xs text-gray-500'>{field?.label}</label>
                                    {field?.options ? field?.options?.map((item, index) => (
                                        <div className='flex gap-2 items-center' key={index}>
                                            <Checkbox />
                                            <h2>{item.label}</h2>
                                        </div>
                                    ))
                                        :
                                        <div className='flex gap-2 items-center'>
                                            <Checkbox />
                                            <h2>{field.label}</h2>
                                        </div>
                                    }
                                </div>
                                : field.fieldType == 'tel' ?
                                    <div className='w-full my-3'>
                                        {/* Tel input field handling here if needed */}
                                    </div>
                                    :
                                    <div className='my-3 w-full'>
                                        <label className='text-xs text-gray-500'>{field.fieldLabel}</label>
                                        <Input type={field.type} placeholder={field?.placeholder} name={field?.fieldName} />
                                    </div>
                    }
                    <div>
                        <FieldEdit defaultValue={field} onUpdate={(value) => {
                            onFieldUpdate(value, index)}} deleteField={()=> deleteField(index)} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FormUi;
