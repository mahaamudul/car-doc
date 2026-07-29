"use client";

import Image from "next/image";
import { Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const ServiceRow = ({ service, services, setServices, isMobile = false }) => {
  const { _id, title, img, price, description } = service;

  // Execute DELETE API Request
  const executeDelete = async (toastId) => {
    try {
      const res = await fetch(`/dashboard/api/delete-service/${_id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setServices(services.filter((item) => item._id !== _id));
        toast.dismiss(toastId);
        toast.success(`${title} deleted successfully.`);
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while deleting.");
    }
  };

  // Custom Toast Confirmation
  const handleDelete = () => {
    toast.custom(
      (t) => (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100 flex flex-col gap-3 max-w-sm">
          <div>
            <h4 className="font-semibold text-gray-900">Delete Service?</h4>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete <span className="font-medium text-gray-700">{title}</span>?
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t)}
              className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition"
            >
              Cancel
            </button>
            <button
              onClick={() => executeDelete(t)}
              className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
      }
    );
  };

  // Render Mobile View
  if (isMobile) {
    return (
      <div className="border rounded-xl p-4 space-y-4">
        <div className="flex gap-4">
          <Image
            src={img || "/placeholder.png"}
            alt={title || "Service"}
            width={96}
            height={96}
            className="w-24 h-24 rounded-xl object-cover"
          />

          <div className="flex-1">
            <h2 className="font-bold text-lg">{title}</h2>
            <p className="mt-2 font-semibold text-primary">${price}</p>
          </div>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2">
          {description}
        </p>

        <div className="flex gap-2">
          <Link href={`/dashboard/update-service/${_id}`} className="flex-1">
            <button className="btn btn-outline btn-sm w-full">
              <Pencil size={16} /> Edit
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-error btn-outline btn-sm flex-1"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    );
  }

  // Render Desktop Table Row
  return (
    <tr className="hover">
      <td>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            className="btn btn-circle btn-primary btn-outline btn-sm"
            title="Delete Service"
          >
            <Trash2 size={18} />
          </button>
          <Link href={`/dashboard/update-service/${_id}`}>
            <button
              className="btn btn-circle btn-primary btn-outline btn-sm"
              title="Edit Service"
            >
              <Pencil size={18} />
            </button>
          </Link>
        </div>
      </td>

      <td>
        <div className="flex items-center gap-4">
          <Image
            src={img || "/placeholder.png"}
            alt={title || "Service"}
            width={80}
            height={80}
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div>
            <h2 className="font-bold text-lg">{title}</h2>
            <p className="text-sm text-gray-500">Automotive Service</p>
          </div>
        </div>
      </td>

      <td className="font-bold text-primary">${price}</td>

      <td className="max-w-xs text-sm text-gray-600 truncate">
        {description}
      </td>
    </tr>
  );
};

export default ServiceRow;