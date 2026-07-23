import { connectDB } from "@/app/lib/connectDB";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const db = await connectDB();
    const servicesCollection = db.collection("services");

    const { id } = await params;

    const service = await servicesCollection.findOne({
      _id: id,
    });

    if (!service) {
      return Response.json({ message: "Service not found" }, { status: 404 });
    }

    return Response.json(service);
  } catch (err) {
    console.error(err);

    return Response.json({ error: err.message }, { status: 500 });
  }
}
