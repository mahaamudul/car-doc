import { connectDB } from "@/app/lib/connectDB";

export const POST = async (request) => {
  try {
    const booking = await request.json();

    const db = await connectDB();

    const bookingCollection = db.collection("bookings");

    const result = await bookingCollection.insertOne(booking);

    return Response.json(
      {
        success: true,
        message: "Booking created successfully",
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
};