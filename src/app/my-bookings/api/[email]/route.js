import { connectDB } from "@/app/lib/connectDB";
import { NextResponse } from "next/server";

export const GET=async(request,{params})=>{
    const {email} = await params;
    const db =await connectDB();
    const myBookingsCollection=db.collection("bookings");
    try{
        const bookings=await myBookingsCollection.find({ email:email }).toArray();
        return NextResponse.json(bookings);
    }
    catch(err){
        return NextResponse.json({error:err.message},{status:500});
    }
}