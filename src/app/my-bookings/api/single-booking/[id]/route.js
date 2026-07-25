import { connectDB } from "@/app/lib/connectDB";
import { ObjectId } from "mongodb";

export const GET = async (request, { params }) => {
  const { id } = await params;
  const db= await connectDB()
  const bookingCollection = db.collection("bookings");
  try {
    const booking = await bookingCollection.findOne({ _id: new ObjectId(id) });
    return Response.json(booking, { status: 200 });
    } catch (error) {
    return new Response.json({ message: "Failed to fetch booking" }, { status: 500 });
  }}