import connectToDB from "@/database/db";
import Note from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    let success = false;
    try {
        await connectToDB();
        const email = await req.json();
        const notes = await Note.find({ shared: email }) // fetching all the notes that are shared with the user
        if (notes) {
            success = true;
            return NextResponse.json({ success, notes })
        } else {
            return NextResponse.json({ success })
        }
    } catch (error) {
        return NextResponse.json({ success })
    }
}