import { Button } from '@/components/ui/button';
import { db } from '@/configs';
import { userResponses } from '@/configs/schema';
import { eq, count, sql } from 'drizzle-orm';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

function FormResponseListItem({ jsonForm, formRecord }) {
    const [loading, setLoading] = useState(false);
    const [responseCount, setResponseCount] = useState(0);

    useEffect(() => {
        fetchResponseCount();
    }, []);

    const fetchResponseCount = async () => {
        const result = await db.select({ count: sql`count(*)`.mapWith(Number) })
            .from(userResponses)
            .where(eq(userResponses.formRef, formRecord.id));

        setResponseCount(result[0].count);
    };

    const exportData = async () => {
        let jsonData = [];
        setLoading(true);
        const result = await db.select().from(userResponses)
            .where(eq(userResponses.formRef, formRecord.id));

        if (result) {
            result.forEach((item) => {
                const jsonItem = JSON.parse(item.jsonResponse);
                jsonData.push(jsonItem);
            });
            setLoading(false);
        }
        exportToExcel(jsonData);
    };

    const exportToExcel = (jsonData) => {
        const worksheet = XLSX.utils.json_to_sheet(jsonData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        XLSX.writeFile(workbook, jsonForm?.formTitle + ".xlsx");
    };

    return (
        <div className='border shadow-md rounded-lg p-4 my-5'>
            <h2 className='text-lg'>{jsonForm?.formTitle}</h2>
            <h2 className='text-sm text-gray-500'>{jsonForm?.formHeading}</h2>
            <hr className='my-4' />
            <div className='flex justify-between items-center'>
                <h2 className='text-sm'><strong>{responseCount}</strong> Responses</h2>
                <Button className='' size='sm'
                    onClick={() => exportData()} disabled={loading}>
                    {loading ? <Loader2 className='animate-spin' /> : 'Export'}
                </Button>
            </div>
        </div>
    );
}

export default FormResponseListItem;