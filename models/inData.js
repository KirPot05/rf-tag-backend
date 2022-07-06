import mongoose from "mongoose";

const incomingStudentsSchema = new mongoose.Schema({

    rfID: {
        type: String,
        required: true
    }


}, {timestamps: true});

export default mongoose.model('Incoming', incomingStudentsSchema );