"use client";

import Image from "next/image";
import { Trash2, CheckCircle, Pencil } from "lucide-react";
import { toast } from "sonner"; // Import toast
import Link from "next/link";

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

  // Actual API logic executed after user confirmation (Plain JavaScript)
  const executeDelete = async (toastId) => {
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
        // Dismiss confirmation toast and show success toast
        toast.dismiss(toastId);
        toast.success(`${serviceName} booking deleted successfully.`);
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while deleting.");
    }
  };

  const handleDelete = () => {
    // Show a custom confirmation toast
    toast.custom((t) => (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100 flex flex-col gap-3 max-w-sm">
        <div>
          <h4 className="font-semibold text-gray-900">Delete Booking?</h4>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete {serviceName}?
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t)}
            className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition"
          >
            Cancel
          </button>
          <button
            onClick={() => executeDelete(t)}
            className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: Infinity, // Stops the confirmation toast from disappearing automatically
      position: "top-center"
    });
  };

  const handleComplete = async () => {
    try {
      const res = await fetch(`process.env.NEXT_PUBLIC_BASE_URL/my-bookings/api/${_id}`, {
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
        toast.success("Booking status updated to completed!");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to complete booking.");
    }
  };

  return (
    <tr className="hover">
      <td>
        <div className="flex items-center gap-2">
          <button
          onClick={handleDelete}
          className="btn btn-circle  btn-primary btn-outline btn-sm"
        >
          <Trash2  size={18} />
        </button>
        <Link href={`/my-bookings/update-booking/${_id}`}>
        <button
          
          className="btn btn-circle  btn-primary btn-outline btn-sm"
        >
          <Pencil size={18} />
        </button>
        </Link>
        </div>
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
