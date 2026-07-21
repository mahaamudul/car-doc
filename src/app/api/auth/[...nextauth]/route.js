import { connectDB } from "@/app/lib/connectDB";
import bcrypt from "bcrypt";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler= NextAuth({

    session:{
        strategy:"jwt",
        maxAge:30*24*60*60, // 30 days
    },
    providers:[
        CredentialsProvider({
           
            credentials:{
                email:{},
                password:{}
            },
            async authorize(credentials){
                const {email,password}=credentials;
                if(!email || !password){
                    return null;
                }

                const db=await connectDB();
                const currentUser=await db.collection("users").findOne({ email });

                const passwordMatch=await bcrypt.compareSync(password, currentUser.password);

                if(!currentUser || !passwordMatch){
                    return null;
                }
                return currentUser;
            }

        }),
        GoogleProvider({
            clientId:process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret:process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId:process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
            clientSecret:process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
        })

    ],
    callbacks:{},
    pages:{
        signIn:"/login",
    }

})


export { handler as GET, handler as POST };