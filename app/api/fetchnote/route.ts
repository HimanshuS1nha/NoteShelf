import connectToDB from "@/database/db";
import Note from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    let success = false;
    try {
        await connectToDB();
        const id = await req.json();
        const note = await Note.findOne({ id }) // fetching the node by the id
        if (note) {
            success = true;
            return NextResponse.json({ success, note })
        } else {
            return NextResponse.json({ success })
        }
    } catch (error) {
        return NextResponse.json({ success })
    }
}