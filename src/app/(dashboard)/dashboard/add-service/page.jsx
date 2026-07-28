import AddServiceForm from "@/components/dashboard/AddServiceForm";

export const metadata = {
  title: "Add New Service | CarDoc Admin",
};

export default function AddServicePage() {
  return (
    <div className="py-4">
      <AddServiceForm />
    </div>
  );
}