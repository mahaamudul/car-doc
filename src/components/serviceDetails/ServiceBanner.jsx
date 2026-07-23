import Image from "next/image";
import Link from "next/link";

const ServiceBanner = ({ title }) => {
  return (
    <div className="relative h-[220px] lg:h-[300px] rounded-xl overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/images/checkout/checkout.png"
        alt="Service Banner"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-8 lg:px-16">
        <h1 className="text-3xl lg:text-5xl font-bold text-white">
          {title}
        </h1>
      </div>

      {/* Breadcrumb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2
                   bg-primary text-white
                   px-8 py-3
                   font-semibold
                   text-sm
                   lg:text-base"
        style={{
          clipPath:
            "polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)",
        }}
      >
        <Link href="/" className="hover:underline">
          Home
        </Link>

        <span className="mx-1">/</span>

        <span>Service Details</span>
      </div>
    </div>
  );
};

export default ServiceBanner;