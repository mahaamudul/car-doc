"use client";

import Image from "next/image";
import { Trash2, CheckCircle } from "lucide-react";

const BookingRow = ({ booking, bookings, setBookings }) => {
  const {
    _id,
    customerName,
    serviceName,
    serviceImage,
    date,
    price,
    status,
  } = booking;

  // Delete Booking
  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/my-bookings/api/${_id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setBookings(bookings.filter((item) => item._id !== _id));
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update Status
  const handleComplete = async () => {
    try {
      const res = await fetch(`/my-bookings/api/${_id}`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (res.ok) {
        const updated = bookings.map((item) =>
          item._id === _id
            ? {
                ...item,
                status: "completed",
              }
            : item
        );

        setBookings(updated);
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <tr className="hover">
      {/* Delete */}
      <td>
        <button
          onClick={handleDelete}
          className="btn btn-circle btn-sm btn-error btn-outline"
        >
          <Trash2 size={18} />
        </button>
      </td>

      {/* Service */}
      <td>
        <div className="flex items-center gap-4">
          <Image
            src={serviceImage}
            alt={serviceName}
            width={90}
            height={90}
            className="rounded-xl object-cover w-20 h-20"
          />

          <div>
            <h2 className="font-bold text-lg">
              {serviceName}
            </h2>

            <p className="text-sm text-gray-500">
              Automotive Service
            </p>
          </div>
        </div>
      </td>

      {/* Customer */}
      <td>
        <div>
          <p className="font-semibold">
            {customerName}
          </p>

          <p className="text-sm text-gray-500">
            Booking Customer
          </p>
        </div>
      </td>

      {/* Date */}
      <td>
        <span className="font-medium">
          {date}
        </span>
      </td>

      {/* Price */}
      <td>
        <span className="font-bold text-primary text-lg">
          ${price}
        </span>
      </td>

      {/* Status */}
      <td>
        {status === "completed" ? (
          <span className="badge badge-success badge-lg">
            Completed
          </span>
        ) : (
          <button
            onClick={handleComplete}
            className="btn btn-primary btn-sm"
          >
            <CheckCircle size={18} />
            Pending
          </button>
        )}
      </td>
    </tr>
  );
};

export default BookingRow;