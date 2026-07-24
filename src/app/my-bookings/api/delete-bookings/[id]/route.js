import { ObjectId } from "mongodb";
import { connectDB } from "@/app/lib/connectDB";

export const DELETE = async (request, { params }) => {
  const { id } = await params;

  try {
    const db = await connectDB();
    const myBookingsCollection = db.collection("bookings");

    const result = await myBookingsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return Response.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Booking deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);

    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
};