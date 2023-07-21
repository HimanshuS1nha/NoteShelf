import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import User from "@/models/User";
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDB from "@/database/db";
import bcrytjs from 'bcryptjs';
import { SessionProps } from "@/types";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',
        }),
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                name: {
                    label: "name",
                    type: "text"
                },
                email: {
                    label: 'email',
                    type: 'email'
                },
                password: {
                    label: 'password',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                await connectToDB();
                try {
                    const { email, password } = credentials as { name: string, email: string, password: string };
                    const user = await User.findOne({ email }) // Finding the user with the email id
                    if (user) {
                        const passwordCompare = await bcrytjs.compare(password, user.password) // comparing the hashed passwords
                        if (passwordCompare) {
                            return user;
                        }
                        return null;
                    } else {
                        return null;
                    }
                } catch (error) {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async session({ session }: SessionProps) { // making the session
            await connectToDB();
            const sessionUser = await User.findOne({ email: session.user?.email });
            if (session.user?.id) {
                session.user.id = sessionUser._id.toString();
            }
            return session;
        },

        async signIn({ profile }) { // signing the user in
            try {
                await connectToDB();
                const userExists = await User.findOne({ email: profile?.email })
                if (!userExists) {
                    User.create({
                        email: profile?.email,
                        name: profile?.name
                    })
                }
                return true;
            } catch (error) {
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST };