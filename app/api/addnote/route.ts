import connectToDB from "@/database/db";
import Note from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    let success = false;
    try {
        await connectToDB();
        const { note, email } = await req.json();
        const { title, description, tag } = note;
        const id = Math.floor(Date.now() * Math.random());
        await Note.create({ id, title, description, tag, email }) // Creating the data in database
        success = true;
        return NextResponse.json({ success })
    } catch (error) {
        return NextResponse.json({ success })
    }
}