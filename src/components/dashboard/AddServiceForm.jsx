"use client";

import { useState } from "react";
import { useRouter } from "next/router"; // Use "next/navigation" if App Router
import { useRouter as useAppRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2, Loader2, Wrench, DollarSign, Image as ImageIcon, FileText } from "lucide-react";
import Heading from "../Shared/Heading";

const DEFAULT_FACILITIES = [
  { name: "Instant Car Services", details: "Quick turnaround time with dedicated technicians." },
  { name: "24/7 Quality Service", details: "Round-the-clock support for all urgent repair needs." },
  { name: "Easy Customer Service", details: "Hassle-free booking and live status updates." },
  { name: "Quality Cost Service", details: "Affordable rates with transparent pricing and no hidden fees." },
];

export default function AddServiceForm() {
  const router = useAppRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    service_id: "",
    title: "",
    img: "",
    price: "",
    description: "",
  });

  // Dynamic Facilities State
  const [facilities, setFacilities] = useState(DEFAULT_FACILITIES);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Facility Handlers
  const handleFacilityChange = (index, field, value) => {
    const updatedFacilities = [...facilities];
    updatedFacilities[index][field] = value;
    setFacilities(updatedFacilities);
  };

  const addFacility = () => {
    setFacilities([...facilities, { name: "", details: "" }]);
  };

  const removeFacility = (index) => {
    if (facilities.length === 1) {
      toast.error("At least one facility detail is required.");
      return;
    }
    setFacilities(facilities.filter((_, i) => i !== index));
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side Validation
    if (!formData.title.trim()) return toast.error("Service title is required.");
    if (!formData.img.trim()) return toast.error("Image URL is required.");
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      return toast.error("Please enter a valid price.");
    }
    if (!formData.description.trim()) return toast.error("Description is required.");

    // Validate Facilities
    const hasEmptyFacility = facilities.some((f) => !f.name.trim() || !f.details.trim());
    if (hasEmptyFacility) {
      return toast.error("Please fill out all facility names and details.");
    }

    setLoading(true);

    try {
      const payload = {
        service_id: formData.service_id.trim() || String(Date.now()).slice(-4),
        title: formData.title.trim(),
        img: formData.img.trim(),
        price: Number(formData.price).toFixed(2),
        description: formData.description.trim(),
        facility: facilities,
      };

      const res = await fetch("/dashboard/api/add-service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Service created successfully!");
        router.push("/dashboard/manage-services");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to create service.");
      }
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-base-100 p-2 rounded-xl border border-base-300 shadow-sm">
        <Heading title="Add New Service" currentRoute="/dashboard/add-service"></Heading>
      <div className="border-b border-base-200 pb-5 mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Wrench className="text-primary" /> Add New Service
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Fill in the details below to add a new car repair or maintenance service to the system.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="form-control">
            <label className="label font-semibold text-sm">
              Service Title <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Electrical System Repair"
                className="input input-bordered w-full pl-10 focus:input-primary"
                required
              />
              <Wrench className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Service ID (Optional / Auto) */}
          <div className="form-control">
            <label className="label font-semibold text-sm">
              Service ID <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              name="service_id"
              value={formData.service_id}
              onChange={handleChange}
              placeholder="e.g. 06 (Auto-generated if empty)"
              className="input input-bordered w-full focus:input-primary"
            />
          </div>

          {/* Price */}
          <div className="form-control">
            <label className="label font-semibold text-sm">
              Price ($) <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="5"
                min="0"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="20.00"
                className="input input-bordered w-full pl-10 focus:input-primary"
                required
              />
              <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="label font-semibold text-sm">
              Image URL <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <input
                type="url"
                name="img"
                value={formData.img}
                onChange={handleChange}
                placeholder="https://i.ibb.co/... or https://images.unsplash.com/..."
                className="input input-bordered w-full pl-10 focus:input-primary"
                required
              />
              <ImageIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label font-semibold text-sm">
            Description <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a detailed explanation of what this service includes..."
              className="textarea textarea-bordered w-full pt-3 focus:textarea-primary"
              required
            ></textarea>
          </div>
        </div>

        {/* Dynamic Facility Features */}
        <div className="space-y-4 pt-4 border-t border-base-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Service Facilities / Key Highlights</h3>
              <p className="text-xs text-gray-500">
                List the core features or guarantees included with this service.
              </p>
            </div>
            <button
              type="button"
              onClick={addFacility}
              className="btn btn-outline btn-primary btn-sm gap-2"
            >
              <Plus size={16} /> Add Facility
            </button>
          </div>

          <div className="space-y-3">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="p-4 bg-base-200/60 rounded-xl border border-base-300 flex flex-col md:flex-row gap-4 items-start md:items-center"
              >
                <div className="flex-1 w-full">
                  <input
                    type="text"
                    placeholder="Facility Name (e.g. 24/7 Quality Service)"
                    value={facility.name}
                    onChange={(e) => handleFacilityChange(index, "name", e.target.value)}
                    className="input input-bordered input-sm w-full font-semibold focus:input-primary"
                    required
                  />
                </div>
                <div className="flex-[2] w-full">
                  <input
                    type="text"
                    placeholder="Details description..."
                    value={facility.details}
                    onChange={(e) => handleFacilityChange(index, "details", e.target.value)}
                    className="input input-bordered input-sm w-full focus:input-primary"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeFacility(index)}
                  className="btn btn-ghost btn-sm text-error btn-square self-end md:self-center"
                  title="Remove Facility"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full text-white font-semibold text-base"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Creating Service...
              </>
            ) : (
              "Add Service Now"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}