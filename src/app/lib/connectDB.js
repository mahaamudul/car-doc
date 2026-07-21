import { MongoClient, ServerApiVersion } from "mongodb";
import dns from "node:dns/promises"
dns.setServers(["8.8.8.8", "1.1.1.1"]);
let db;
let client;

export const connectDB = async () => {
  if (db) return db;

  const uri = process.env.NEXT_PUBLIC_MONGO_URI;

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();

  db = client.db("car-doc");

  return db;
};