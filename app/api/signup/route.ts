import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

import connectToDB from "@/database/db";
import User from "@/models/User"

export const POST = async (req: NextRequest) => {
    let success = false;
    try {
        await connectToDB();
        const { name, email, password } = await req.json();
        const user = await User.findOne({ email }); // checking if the user with this email already exists or not
        if (user) {
            return NextResponse.json({ success, message: 'Email already exists. Use a different email' })
        }
        const secPassword = await bcryptjs.hash(password, 10); // encrypting the password
        await User.create({ name, email, password: secPassword }); // creating record in the database
        success = true;
        return NextResponse.json({ success });
    } catch (error) {
        return NextResponse.json({ success, message: 'Some error occured. Please try again later!' })
    }
}