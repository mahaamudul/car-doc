import { getServiceDetails } from "@/services/api_call/getServices";
import ServiceContent from "@/components/serviceDetails/ServiceContent";
import ServiceSidebar from "@/components/serviceDetails/ServiceSidebar";
import Heading from "@/components/Shared/Heading";

export const metadata = {
  title: "Service Details",
  description: "Car repair and maintenance services",
};

const Page = async ({ params }) => {
  const { id } = await params;

  const service = await getServiceDetails(id);

  return (
    <section className="pb-24">
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <Heading title="All about the service" currentRoute="Service Details" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 mt-16">
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <ServiceContent service={service} />
          </div>

          {/* Right Sidebar */}
          <div>
            <ServiceSidebar
              service={service}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;