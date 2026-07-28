import { getServiceDetails } from "@/services/api_call/getServices";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import Heading from "@/components/Shared/Heading";

const Page = async ({ params }) => {
  const { id } = await params;

  const service = await getServiceDetails(id);

  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <Heading title="Checkout from here" currentRoute="Checkout" />
      </div>
  
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <CheckoutForm service={service} />
      </div>
    </section>
  );
};

export default Page;