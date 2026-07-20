import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ServiceCard = ({ service }) => {
  const { _id, title, img, price } = service;

  return (
    <div className="card bg-base-100 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group">
      <figure className="p-5 pb-0">
        <Image
          src={img}
          alt={title}
          width={500}
          height={300}
          className="rounded-xl h-56 w-full object-cover group-hover:scale-105 transition duration-500"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-2xl font-bold">
          {title}
        </h2>

        <div className="flex items-center justify-between mt-4">
          <p className="text-primary font-bold text-xl">
            Price : ${price}
          </p>

          <Link
            href={`/services/${_id}`}
            className="text-primary hover:translate-x-1 transition"
          >
            <ArrowRight size={22} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;