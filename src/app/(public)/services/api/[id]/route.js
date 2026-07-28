import { connectDB } from "@/app/lib/connectDB";
import { NextResponse } from "next/server";


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
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (err) {

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
