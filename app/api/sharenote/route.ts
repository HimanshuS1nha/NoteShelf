import connectToDB from "@/database/db";
import Note from "@/models/Note";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    let success = false;
    try {
        await connectToDB();
        const { id, note } = await req.json();
        const { shared } = note;
        const user = await User.findOne({ email: shared }) // checking if the user to whom the note is shared exists or not
        if (user) {
            await Note.findOneAndUpdate({ id }, { shared }) // fetching the note by id and updating it
            success = true;
            return NextResponse.json({ success })
        } else {
            return NextResponse.json({ success, message: 'This email does not exist in the records' })
        }
    } catch (error) {
        return NextResponse.json({ success, message: 'Some error occured. Please try aagain later!' })
    }
}