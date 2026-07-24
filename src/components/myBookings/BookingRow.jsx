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

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `/my-bookings/api/delete-bookings/${_id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setBookings(
          bookings.filter((item) => item._id !== _id)
        );
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

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
      <td>
        <button
          onClick={handleDelete}
          className="btn btn-circle btn-error btn-outline btn-sm"
        >
          <Trash2 size={18} />
        </button>
      </td>

      <td>
        <div className="flex items-center gap-4">
          <Image
            src={serviceImage}
            alt={serviceName}
            width={90}
            height={90}
            className="w-20 h-20 rounded-xl object-cover"
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

      <td>
        <div>
          <h3 className="font-semibold">
            {customerName}
          </h3>
        </div>
      </td>

      <td>{date}</td>

      <td className="font-bold text-primary">
        ${price}
      </td>

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