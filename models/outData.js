import mongoose from "mongoose";

const outgoingStudentsSchema = new mongoose.Schema({

    rfID: {
        type: String, 
        required: true
    }

}, {timestamps: true});

export default mongoose.model('Outgoing', outgoingStudentsSchema );