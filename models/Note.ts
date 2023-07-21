import { Schema, models, model } from 'mongoose';

const noteSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    shared: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const Note = models.note || model("note", noteSchema);

export default Note;