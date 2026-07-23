import Image from "next/image";
import { Play } from "lucide-react";

const ServiceContent = ({ service }) => {
  const {
    title,
    img,
    description,
    facility,
  } = service;

  return (
    <div className="space-y-10">
      {/* Service Image */}
      <div className="relative w-full h-[300px] lg:h-[520px] rounded-xl overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Title */}
      <div>
        <h2 className="text-4xl font-bold mb-6">
          {title}
        </h2>

        <p className="text-base-content/70 leading-8">
          {description}
        </p>
      </div>

      {/* Facilities */}
      <div className="grid md:grid-cols-2 gap-6">
        {facility?.map((item, index) => (
          <div
            key={index}
            className="bg-base-200 rounded-xl p-6 border-t-4 border-primary"
          >
            <h3 className="text-xl font-bold mb-3">
              {item.name}
            </h3>

            <p className="text-base-content/70 leading-7">
              {item.details}
            </p>
          </div>
        ))}
      </div>

      {/* Description */}
      <p className="text-base-content/70 leading-8">
        {description}
      </p>

      {/* Process */}
      <div>
        <h2 className="text-4xl font-bold mb-5">
          3 Simple Steps to Process
        </h2>

        <p className="text-base-content/70 leading-8 mb-10">
          We follow a simple and transparent workflow to
          ensure every vehicle receives professional care
          and leaves our workshop in excellent condition.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              no: "01",
              title: "Step One",
            },
            {
              no: "02",
              title: "Step Two",
            },
            {
              no: "03",
              title: "Step Three",
            },
          ].map((step) => (
            <div
              key={step.no}
              className="border rounded-xl p-8 text-center hover:shadow-lg transition"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-5">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {step.no}
                </div>
              </div>

              <h3 className="font-bold uppercase text-lg mb-3">
                {step.title}
              </h3>

              <p className="text-base-content/60">
                It uses a dictionary of over 200 Latin words
                combined with model sentence structures.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Video */}
      <div className="relative h-[250px] lg:h-[450px] rounded-xl overflow-hidden">
        <Image
          src={img}
          alt="Video"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
          <button className="w-24 h-24 rounded-full border-4 border-primary bg-white/10 backdrop-blur flex items-center justify-center hover:scale-105 duration-300">
            <Play
              className="text-primary fill-primary ml-1"
              size={42}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceContent;