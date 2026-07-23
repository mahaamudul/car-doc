import { connectDB } from "@/app/lib/connectDB";

export const GET=async()=>{
    const db =await connectDB();
    const servicesCollection=db.collection("services");
    try{
        const services=await servicesCollection.find().toArray();
        return Response.json(services);
    }
    catch(err){
        console.error(err);
        return Response.json({error:err.message},{status:500});
    }
}