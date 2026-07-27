import BookingBanner from "@/components/myBookings/BookingBanner";
import Heading from "@/components/Shared/Heading";
import UpdateForm from "@/components/update/UpdateForm";
import { getBookingDetails } from "@/services/api_call/getBooking";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const booking = await getBookingDetails(id);

  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <Heading title="Modify your booking details" currentRoute="Update Booking" />
      </div>
  
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <UpdateForm booking={booking} />
      </div>
    </section>
  );
};

export default page;
