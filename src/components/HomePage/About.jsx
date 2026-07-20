import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Images */}
          <div className="relative">

            {/* Main Image */}
            <div className="w-[85%]">
              <Image
                src="/assets/images/about_us/person.jpg"
                alt="Car Mechanic"
                width={600}
                height={700}
                className="rounded-2xl shadow-xl object-cover w-full"
              />
            </div>

            {/* Floating Image */}
            <div className="absolute bottom-0 right-0 w-[55%] translate-y-10">
              <Image
                src="/assets/images/about_us/parts.jpg"
                alt="Car Parts"
                width={400}
                height={400}
                className="rounded-2xl border-8 border-white shadow-2xl"
              />
            </div>
          </div>

          {/* Right Content */}
          <div>

            <p className="text-primary font-semibold text-lg mb-3">
              About Us
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              We are qualified & experienced in this field
            </h2>

            <p className="text-gray-500 mb-6 leading-8">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which dont look even
              slightly believable.
            </p>

            <p className="text-gray-500 mb-8 leading-8">
              We provide reliable automotive repair and maintenance services
              using modern equipment and experienced technicians. Customer
              satisfaction and quality workmanship are always our top priority.
            </p>

            <button className="btn btn-primary px-8">
              Get More Info
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;