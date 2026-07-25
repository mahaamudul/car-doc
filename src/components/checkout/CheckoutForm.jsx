"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CheckoutForm = ({ service }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const booking = {
      customerName: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      date: form.date.value,
      message: form.message.value,

      serviceId: service._id,
      serviceName: service.title,
      serviceImage: service.img,
      price: service.price,

      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await fetch("/checkout/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Booking Successful!");

        console.log(data);

        form.reset();
      } else {
                toast.error("Booking Failed!");

      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="bg-base-200 rounded-xl p-8 lg:p-14">
      <form onSubmit={handleBooking} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <input
            name="name"
            type="text"
            required
            defaultValue={session?.user?.name || ""}
            placeholder="Your Name"
            className="input input-bordered w-full"
          />

          {/* Email */}
          <input
          readOnly
            name="email"
            type="email"
            required
            defaultValue={session?.user?.email || ""}
            placeholder="Email"
            className="input input-bordered w-full"
          />

          {/* Phone */}
          <input
            name="phone"
            type="text"
            required
            placeholder="Phone Number"
            className="input input-bordered w-full"
          />

          {/* Date */}
          <input
            name="date"
            type="date"
            required
            className="input input-bordered w-full"
          />

          {/* Service */}
          <input
            readOnly
            value={service.title}
            className="input input-bordered w-full bg-base-100"
          />

          {/* Price */}
          <input
            readOnly
            value={`$${service.price}`}
            className="input input-bordered w-full bg-base-100"
          />
        </div>

        {/* Address */}
        <input
          name="address"
          type="text"
          required
          placeholder="Your Address"
          className="input input-bordered w-full"
        />

        {/* Message */}
        <textarea
          name="message"
          rows={8}
          placeholder="Your Message"
          className="textarea textarea-bordered w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full text-lg"
        >
          {loading ? "Processing..." : "Order Confirm"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
