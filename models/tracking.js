import mongoose from "mongoose";

const trackingSchema = new mongoose.Schema({

    rfID: {
        type: String,
        required: true
    },

    entryType: {
        type: String,
        required: true
    }


}, {timestamps: true});

export default mongoose.model('Tracking', trackingSchema );