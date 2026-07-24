"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import BookingBanner from "@/components/myBookings/BookingBanner";
import BookingTable from "@/components/myBookings/BookingTable";

const MyBookingsPage = () => {
  const { data: session, status } = useSession();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `/my-bookings/api/${session.user.email}`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        // API may return { bookings: [...] } or [...]
        setBookings(data.bookings || data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [status, session]);

  if (status === "loading" || loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold">
          Please login first
        </h2>
      </div>
    );
  }

  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <BookingBanner />
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16">
        {bookings.length === 0 ? (
          <div className="bg-base-100 rounded-xl shadow border p-16 text-center">
            <h2 className="text-3xl font-bold">
              No Bookings Found
            </h2>

            <p className="text-gray-500 mt-3">
              You havent booked any services yet.
            </p>
          </div>
        ) : (
          <BookingTable
            bookings={bookings}
            setBookings={setBookings}
          />
        )}
      </div>
    </section>
  );
};

export default MyBookingsPage;