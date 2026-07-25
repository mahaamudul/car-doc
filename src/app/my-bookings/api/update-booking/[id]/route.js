import { connectDB } from "@/app/lib/connectDB";
import { ObjectId } from "mongodb";

export const PATCH = async (request, { params }) => {
  try {
    const { id } = await params;

    const db = await connectDB();
    const bookingCollection = db.collection("bookings");

    const updatedDoc =
      await request.json();

    const result = await bookingCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
            ...updatedDoc,
        },
      },
      {
        upsert: false,
      }
    );

    if (result.matchedCount === 0) {
      return Response.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Booking updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to update booking",
        error: error.message,
      },
      { status: 500 }
    );
  }
};