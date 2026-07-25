"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UpdateForm = ({ booking }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const updatedBooking = {
      customerName: form.name.value,
      phone: form.phone.value,
      address: form.address.value,
      date: form.date.value,
      message: form.message.value,
    };

    try {
      const res = await fetch(
        `/my-bookings/api/update-booking/${booking._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBooking),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Booking updated successfully!");

        router.push("/my-bookings");
        router.refresh();
      } else {
        toast.error(data.message || "Update failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="bg-base-200 rounded-xl p-8 lg:p-14">
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <input
            name="name"
            type="text"
            required
            defaultValue={booking.customerName}
            className="input input-bordered w-full"
          />

          {/* Email */}
          <input
            readOnly
            type="email"
            value={booking.email}
            className="input input-bordered w-full bg-base-100"
          />

          {/* Phone */}
          <input
            name="phone"
            type="text"
            required
            defaultValue={booking.phone}
            className="input input-bordered w-full"
          />

          {/* Date */}
          <input
            name="date"
            type="date"
            required
            defaultValue={booking.date}
            className="input input-bordered w-full"
          />

          {/* Service */}
          <input
            readOnly
            value={booking.serviceName}
            className="input input-bordered w-full bg-base-100"
          />

          {/* Price */}
          <input
            readOnly
            value={`$${booking.price}`}
            className="input input-bordered w-full bg-base-100"
          />
        </div>

        {/* Address */}
        <input
          name="address"
          type="text"
          required
          defaultValue={booking.address}
          className="input input-bordered w-full"
        />

        {/* Message */}
        <textarea
          name="message"
          rows={8}
          defaultValue={booking.message}
          className="textarea textarea-bordered w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full text-lg"
        >
          {loading ? "Updating..." : "Update Booking"}
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;