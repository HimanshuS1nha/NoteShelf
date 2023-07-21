import connectToDB from "@/database/db";
import Note from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    let success = false;
    try {
        await connectToDB();
        const { id, note } = await req.json();
        const { title, description, tag } = note;
        await Note.findOneAndUpdate({ id }, { title, description, tag }) // finding the note by id and updating it
        success = true;
        return NextResponse.json({ success })
    } catch (error) {
        return NextResponse.json({ success })
    }
}