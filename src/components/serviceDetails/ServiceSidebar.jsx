import Link from "next/link";
import { Download, ArrowRight, Phone } from "lucide-react";

const ServiceSidebar = ({ service }) => {
  const services = [
    "Full Car Repair",
    "Engine Repair",
    "Automatic Services",
    "Engine Oil Change",
    "Battery Charge",
  ];

  return (
    <div className="space-y-8 sticky top-24">
      {/* Services */}
      <div className="bg-base-200 rounded-xl p-7">
        <h2 className="text-2xl font-bold mb-6">
          Services
        </h2>

        <div className="space-y-4">
          {services.map((item, index) => (
            <Link
              key={index}
              href="#"
              className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                item === service.title
                  ? "bg-primary text-white"
                  : "bg-white hover:bg-primary hover:text-white"
              }`}
            >
              <span className="font-medium">
                {item}
              </span>

              <ArrowRight size={18} />
            </Link>
          ))}
        </div>
      </div>

      {/* Download */}
      <div className="bg-[#151515] text-white rounded-xl p-7">
        <h2 className="text-2xl font-bold mb-6">
          Download
        </h2>

        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <Download className="text-primary" />

              <div>
                <h3 className="font-semibold">
                  Our Brochure
                </h3>

                <p className="text-sm text-gray-400">
                  Download PDF
                </p>
              </div>
            </div>

            <button className="btn btn-primary btn-square">
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <Download className="text-primary" />

              <div>
                <h3 className="font-semibold">
                  Company Details
                </h3>

                <p className="text-sm text-gray-400">
                  Download PDF
                </p>
              </div>
            </div>

            <button className="btn btn-primary btn-square">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Help Card */}
      <div className="bg-[#151515] rounded-xl p-8 text-center text-white">
        <div className="w-20 h-20 rounded-full bg-primary mx-auto flex items-center justify-center">
          <Phone size={36} />
        </div>

        <h2 className="text-2xl font-bold mt-6">
          Need Help?
        </h2>

        <p className="text-gray-300 mt-3 leading-7">
          Our support team is available 24/7 to help
          you with bookings and service inquiries.
        </p>

        <div className="mt-6">
          <p className="text-primary text-xl font-bold">
            Car Doctor
          </p>

          <p className="text-gray-400">
            Special Support
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="bg-base-200 rounded-xl p-7">
        <h2 className="text-3xl font-bold">
          Price : ${service.price}
        </h2>

        <button className="btn btn-primary w-full mt-6">
          Proceed Checkout
        </button>
      </div>
    </div>
  );
};

export default ServiceSidebar;