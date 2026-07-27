import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const Heading = ({ title, currentRoute }) => {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl shadow-lg my-6 group">
      {/* Background Image */}
      <Image
        src="/assets/images/checkout/checkout.png"
        alt={title || "Banner"}
        width={1200}
        height={300}
        className="w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        priority
      />

      {/* Modern Dual-Tone Overlay (Dark Tint + Subtle Bottom Glow) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

      {/* Decorative Brand Accent Tag (Top Right Corner) */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-16 z-10">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
          {title}
        </h1>

        {/* Modern Breadcrumb Badge */}
        <nav className="mt-6">
          <div className="inline-flex items-center gap-2 bg-base-100/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full text-sm sm:text-base font-medium shadow-sm hover:border-primary/50 transition-colors">
            <Link
              href="/"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Home size={16} />
              <span>Home</span>
            </Link>

            <ChevronRight size={16} className="text-primary" />

            <span className="text-primary font-semibold">{currentRoute}</span>
          </div>
        </nav>
      </div>

      {/* Bottom Trapeze / Notch Accent (Matches Original Car Doctor Theme) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="bg-primary text-white text-xs font-semibold px-8 py-1.5 rounded-t-xl tracking-wider uppercase shadow-md">
          Car Doctor
        </div>
      </div>
    </div>
  );
};

export default Heading;