"use client";

import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "keen-slider/keen-slider.min.css";

const banners = [
  {
    title: "Affordable Car Repair Services",
    description:
      "There are many variations of passages available, but the majority have suffered alteration in some form.",
  },
  {
    title: "Expert Car Maintenance",
    description:
      "Professional maintenance services to keep your vehicle in perfect condition.",
  },
  {
    title: "Reliable Auto Repair",
    description:
      "Fast, reliable and affordable auto repair solutions from certified mechanics.",
  },
  {
    title: "Professional Car Diagnostics",
    description:
      "Advanced diagnostic tools to identify and solve vehicle problems quickly.",
  },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="relative">

      <div ref={sliderRef} className="keen-slider ">

        {banners.map((banner, index) => (
          <div
            key={index}
            className="keen-slider__slide h-[600px] flex items-center"
            style={{
              backgroundImage: `linear-gradient(to right,
                rgba(21,21,21,.90),
                rgba(21,21,21,.40)),
                url(/assets/images/banner/${index + 1}.jpg)`,

              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="max-w-2xl text-white px-8 md:px-20">

              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 capitalize">
                {banner.title}
              </h1>

              <p className="text-lg text-gray-200 mb-8">
                {banner.description}
              </p>

              <div className="flex gap-4">
                <button className="btn btn-primary">
                  Discover More
                </button>

                <button className="btn btn-outline text-white border-white hover:bg-white hover:text-black">
                  Latest Project
                </button>
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Left Arrow */}

      {loaded && instanceRef.current && (
        <>
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute left-5 top-1/2 -translate-y-1/2 btn btn-circle bg-black/40 border-none text-white hover:bg-primary"
          >
            <ChevronLeft />
          </button>

          {/* Right Arrow */}

          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute right-5 top-1/2 -translate-y-1/2 btn btn-circle bg-black/40 border-none text-white hover:bg-primary"
          >
            <ChevronRight />
          </button>
        </>
      )}

      {/* Dots */}

      {loaded && instanceRef.current && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === idx
                  ? "bg-primary scale-125"
                  : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}