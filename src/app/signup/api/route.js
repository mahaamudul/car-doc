import { connectDB } from "@/app/lib/connectDB";

export async function POST(request) {
  try {
    const newUser = await request.json();

    console.log(newUser);
    console.log(typeof newUser);

    const db = await connectDB();
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({
      email: newUser.email,
    });

    if (existingUser) {
      return Response.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const result = await usersCollection.insertOne(newUser);

    return Response.json(
      {
        message: "User created successfully",
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);

    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}