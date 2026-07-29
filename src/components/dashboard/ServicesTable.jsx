"use client";

import ServiceRow from "./ServiceRow";

const ServicesTable = ({ services, setServices }) => {
  return (
    <div className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden shadow-sm">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr className="text-base font-semibold">
              <th className="w-24">Actions</th>
              <th>Service</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <ServiceRow
                key={service._id}
                service={service}
                services={services}
                setServices={setServices}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden p-5 space-y-5">
        {services.map((service) => (
          <ServiceRow
            key={service._id}
            service={service}
            services={services}
            setServices={setServices}
            isMobile
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesTable;