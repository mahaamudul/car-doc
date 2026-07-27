import { connectDB } from "@/app/lib/connectDB";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    const newUser = await request.json();

   

    const db = await connectDB();
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({
      email: newUser.email,
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = bcrypt.hashSync(newUser.password, 10);

    const result = await usersCollection.insertOne({ ...newUser, password: hashedPassword });

    return NextResponse.json(
      {
        message: "User created successfully",
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (err) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}