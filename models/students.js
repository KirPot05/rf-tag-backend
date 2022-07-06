import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    rfID: {
        type: String, 
        required: true
    },

    college: {
        type: String,
        required: true
    }

}, {timestamps: true});

export default mongoose.model('Students', studentSchema);