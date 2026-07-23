import React from "react";
import ServiceCard from "../cards/ServiceCard";
import { services } from "../../app/lib/services";
import { getServices } from "@/services/api_call/getServices";


const Service = async () => {
  const services = await getServices();
  console.log(services);
  return (
    <section className="py-24">

      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}

        <div className="max-w-3xl mx-auto text-center mb-16">

          <p className="text-primary text-xl font-semibold mb-3">
            Service
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Our Service Area
          </h2>

          <p className="text-gray-500 leading-8">
            We provide professional automotive repair and maintenance
            services with experienced mechanics, quality parts and
            affordable pricing to keep your vehicle running smoothly.
          </p>

        </div>

        {/* Services */}

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
            />
          ))}
        </div>

        {/* Button */}

        <div className="flex justify-center mt-14">
          <button className="btn btn-outline btn-primary px-10">
            More Services
          </button>
        </div>

      </div>

    </section>
  );
};

export default Service;