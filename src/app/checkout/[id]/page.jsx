import { getServiceDetails } from "@/services/api_call/getServices";
import ServiceBanner from "@/components/serviceDetails/ServiceBanner";
import CheckoutForm from "@/components/checkout/CheckoutForm";

const Page = async ({ params }) => {
  const { id } = await params;

  const service = await getServiceDetails(id);

  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <ServiceBanner title="Check Out" />
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-20">
        <CheckoutForm service={service} />
      </div>
    </section>
  );
};

export default Page;