import { connectDB } from "@/app/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const db = await connectDB();
    const serviceCollection = db.collection("services");

    // Fetch all services from the collection
    const services = await serviceCollection.find().toArray();

    return NextResponse.json(
      { services },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching services:", err);
    return NextResponse.json(
      { error: "Failed to fetch services", details: err.message },
      { status: 500 }
    );
  }
};