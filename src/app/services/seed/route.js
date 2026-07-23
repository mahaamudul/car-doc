import { connectDB } from "@/app/lib/connectDB";
import { services } from "@/app/lib/services";

export const GET =async()=>{
    const db =await connectDB();
    const servicesCollection=db.collection("services");
    try{
        await servicesCollection.deleteMany();
        const response=await servicesCollection.insertMany(services)

        return Response.json({
            message:"Services seeded successfully"})
        }
        catch(err){
            console.error(err);
            
        }
}