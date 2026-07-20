let db;

export const connectDB = async () => {
  if (db) return db;
  try {
    const uri= process.env.NEXT_PUBLIC_MONGO_URI;
    const client=new MongoClient(uri,{
        serverApi:{
            version: ServerApiVersion.v1,
            strict:true,
            deprecationErrors:true
        }
    })
    db=client.db("car-doc");
  } catch (err) {
    console.log(err);
  }
};
