import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    }
}, { timestamps: true });

const User = models.user || model("user", userSchema)

export default User;