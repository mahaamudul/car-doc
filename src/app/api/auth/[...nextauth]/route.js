import { connectDB } from "@/app/lib/connectDB";
import bcrypt from "bcrypt";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }

        const db = await connectDB();
        const currentUser = await db.collection("users").findOne({ email });

        const passwordMatch = await bcrypt.compareSync(
          password,
          currentUser.password,
        );

        if (!currentUser || !passwordMatch) {
          return null;
        }
        return currentUser;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { email, name, image } = user;
        try {
          const db = await connectDB();
          const userCollection = db.collection("users");

          const existingUser = await userCollection.findOne({ email });

          if (!existingUser) {
            const response = await userCollection.insertOne(user);
            return user;
          } else {
            return user;
          }
        } catch (err) {
          return NextResponse.json(
            {
              success: false,
              message: err.message,
            },
            { status: 500 }
          );
        }
      } else {
        return user;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
