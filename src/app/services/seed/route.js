import { connectDB } from "@/app/lib/connectDB";
import { services } from "@/app/lib/services";
import { NextResponse } from "next/server";

export const GET =async()=>{
    const db =await connectDB();
    const servicesCollection=db.collection("services");
    try{
        await servicesCollection.deleteMany();
        const response=await servicesCollection.insertMany(services)

        return NextResponse.json({
            message:"Services seeded successfully"})
        }
        catch(err){
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
}