"use client";

import BookingRow from "./BookingRow";

const BookingTable = ({ bookings, setBookings }) => {
  return (
    <div className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden shadow-sm">
      {/* Desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr className="text-base font-semibold">
              <th className="w-16"></th>
              <th>Service</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <BookingRow
                key={booking._id}
                booking={booking}
                bookings={bookings}
                setBookings={setBookings}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="lg:hidden p-5 space-y-5">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="border rounded-xl p-4 space-y-4"
          >
            <div className="flex gap-4">
              <img
                src={booking.serviceImage}
                alt={booking.serviceName}
                className="w-24 h-24 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h2 className="font-bold text-lg">
                  {booking.serviceName}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {booking.customerName}
                </p>

                <p className="mt-2 font-semibold text-primary">
                  ${booking.price}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span>{booking.date}</span>

              <span
                className={`badge ${
                  booking.status === "completed"
                    ? "badge-success"
                    : "badge-warning"
                }`}
              >
                {booking.status}
              </span>
            </div>

            <button className="btn btn-error btn-outline btn-sm w-full">
              Delete Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingTable;