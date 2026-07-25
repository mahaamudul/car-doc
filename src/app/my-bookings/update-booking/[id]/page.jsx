import UpdateForm from '@/components/update/UpdateForm';
import { getBookingDetails } from '@/services/api_call/getBooking';
import React from 'react';

const page = async ({ params }) => {
    const { id } = await params;
    const booking = await getBookingDetails(id);
    
    return (
        <>
        <UpdateForm booking={booking}></UpdateForm>
        </>
    );
};

export default page;