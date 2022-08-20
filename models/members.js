import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    institution: {
      type: String,
      required: true,
    },

    rfID: {
      type: String,
      required: true,
    },

    isStudent: {
      type: Boolean,
      default: false,
      required: true,
    },

    isStaff: {
      type: Boolean,
      default: false,
      required: true,
    },

    isTrust: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("members", studentSchema);
