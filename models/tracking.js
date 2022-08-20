import mongoose from "mongoose";

const trackingSchema = new mongoose.Schema(
  {
    rfID: {
      type: String,
      required: true,
    },

    isEntered: {
      type: Boolean,
      default: true,
      required: true,
    },

    isExited: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("trackings", trackingSchema);
