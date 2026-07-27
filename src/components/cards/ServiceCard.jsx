import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ServiceCard = ({ service }) => {
  const { _id, title, img, price } = service;

  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group flex flex-col justify-between">
      
      {/* Image Container with Zoom Mask */}
      <figure className="p-4 pb-0 relative overflow-hidden">
        <div className="w-full h-56 rounded-xl overflow-hidden relative">
          <Image
            src={img || "/assets/images/placeholder.svg"}
            alt={title || "Automotive Service"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          />
        </div>
      </figure>

      {/* Content Body */}
      <div className="card-body p-5">
        <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors line-clamp-1">
          {title}
        </h3>

        {/* Footer Info */}
        <div className="flex items-center justify-between mt-4 pt-2 border-t border-base-100">
          <div>
            <span className="text-xs text-gray-500 font-medium block uppercase tracking-wider">
              Starting From
            </span>
            <p className="text-primary font-extrabold text-xl">
              ${price}
            </p>
          </div>

          {/* Interactive Arrow Button */}
          <Link
            href={`/services/${_id}`}
            aria-label={`View details for ${title}`}
            className="btn btn-circle btn-primary btn-outline btn-sm group-hover:bg-primary group-hover:text-white transition-all duration-300"
          >
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>

    </div>
  );
};

export default ServiceCard;