import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BookingBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <Image
        src="/assets/images/checkout/checkout.png"
        alt="My Bookings"
        width={1200}
        height={300}
        className="w-full h-[260px] object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          My Bookings
        </h1>

        <div className="mt-5">
          <div className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-medium">
            <Link href="/">Home</Link>

            <ChevronRight size={18} className="mx-2" />

            <span>My Bookings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingBanner;