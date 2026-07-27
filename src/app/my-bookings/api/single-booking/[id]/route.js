import { connectDB } from "@/app/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = await params;
  const db= await connectDB()
  const bookingCollection = db.collection("bookings");
  try {
    const booking = await bookingCollection.findOne({ _id: new ObjectId(id) });
    return NextResponse.json(booking, { status: 200 });
    } catch (error) {

  return NextResponse.json(
    { message: "Failed to fetch booking" },
    { status: 500 }
  );
  }}