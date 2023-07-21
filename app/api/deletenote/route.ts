import connectToDB from "@/database/db";
import Note from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    let success = false;
    try {
        await connectToDB();
        const id = await req.json();
        await Note.findOneAndRemove({ id }); // deleting the record
        success = true;
        return NextResponse.json({ success })
    } catch (error) {
        return NextResponse.json({ success })
    }
}