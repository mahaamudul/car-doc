import { connectDB } from "@/app/lib/connectDB";
import { ObjectId } from "mongodb";

/**
 * Fetch all services directly from MongoDB
 */
export const getServices = async () => {
  try {
    const db = await connectDB();
    const services = await db.collection("services").find({}).toArray();

    // Convert MongoDB _id (ObjectID) to String for Next.js component compatibility
    return services.map((service) => ({
      ...service,
      _id: service._id.toString(),
    }));
  } catch (err) {
    console.error("Failed to fetch services:", err);
    return [];
  }
};

/**
 * Fetch a single service by ID directly from MongoDB
 */
export const getServiceDetails = async (id) => {
  try {
    if (!id) return null;

    const db = await connectDB();
    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { service_id: id };
    const service = await db.collection("services").findOne(query);

    if (!service) return null;

    return {
      ...service,
      _id: service._id.toString(),
    };
  } catch (err) {
    console.error(`Failed to fetch service details for ID ${id}:`, err);
    return null;
  }
};