import { connectDB } from "@/app/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const booking = await request.json();

    const db = await connectDB();

    const bookingCollection = db.collection("bookings");

    const result = await bookingCollection.insertOne(booking);

    return NextResponse.json(
      {
        success: true,
        message: "Booking created successfully",
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (err) {
    
  

    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
};