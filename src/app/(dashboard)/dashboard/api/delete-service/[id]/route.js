import { connectDB } from "@/app/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const { id } = await params;

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid ID format" },
      { status: 400 }
    );
  }

  try {
    const db = await connectDB();
    const serviceCollection = db.collection("services");

    // DEBUG: Log the database name and collection count
    console.log("Database connected:", db.databaseName);
    console.log("Total docs in services:", await serviceCollection.countDocuments());

    // Try finding by ObjectId first
    let result = await serviceCollection.deleteOne({ _id: new ObjectId(id) });

    // Fallback: If not found, try finding by raw string
    if (result.deletedCount === 0) {
      result = await serviceCollection.deleteOne({ _id: id });
    }

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Service not found in database" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Service deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
};