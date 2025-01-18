import { nanoid } from "nanoid";
import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema(
  {
    fullUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      default: () => nanoid(10),
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
export const urlModel = mongoose.model("ShortUrl", shortUrlSchema);
