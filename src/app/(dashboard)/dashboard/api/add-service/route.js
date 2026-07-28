import { connectDB } from "@/app/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const service = await request.json();

    // Basic check to ensure required fields exist
    if (!service.title || !service.img || !service.price) {
      return NextResponse.json(
        {
          success: false,
          message: "title, img, and price are required fields.",
        },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const serviceCollection = db.collection("services");

    // Insert the exact payload as provided
    const result = await serviceCollection.insertOne(service);

    return NextResponse.json(
      {
        success: true,
        message: "Service created successfully",
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to create service",
      },
      { status: 500 }
    );
  }
};