import { connectDB } from "@/app/lib/connectDB";

export const GET=async(request,{params})=>{
    const {email} = await params;
    const db =await connectDB();
    const myBookingsCollection=db.collection("bookings");
    try{
        const bookings=await myBookingsCollection.find({ email:email }).toArray();
        return Response.json(bookings);
    }
    catch(err){
        console.error(err);
        return Response.json({error:err.message},{status:500});
    }
}