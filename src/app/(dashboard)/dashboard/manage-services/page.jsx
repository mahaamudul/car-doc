"use client";

import { useEffect, useState } from "react";
import ServicesTable from "@/components/dashboard/ServicesTable";
import Heading from "@/components/Shared/Heading";

const ManageServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/dashboard/api/services", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await res.json();
        
        // Ensure services state handles both array or object response formats safely
        setServices(data.services || data || []);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center text-red-500">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="mt-2">{error}</p>
      </div>
    );
  }

  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <Heading title="Manage Services" currentRoute="Manage Services" />
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16">
        {services.length === 0 ? (
          <div className="bg-base-100 rounded-xl shadow border p-16 text-center">
            <h2 className="text-3xl font-bold">No Services Found</h2>
            <p className="text-gray-500 mt-3">
              There are no services added yet.
            </p>
          </div>
        ) : (
          <ServicesTable services={services} setServices={setServices} />
        )}
      </div>
    </section>
  );
};

export default ManageServicesPage;