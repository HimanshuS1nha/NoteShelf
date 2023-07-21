import mongoose from "mongoose";

const mongodbURI = process.env.MONGO_URI || "";

const connectToDB = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            return;
        }
        await mongoose.connect(mongodbURI, {
            dbName: 'NoteHub'
        });
    } catch (error) {
        console.log(error);
    }
}

export default connectToDB;