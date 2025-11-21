import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  code: { type: String,  unique: true },
  url: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  lastClicked: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const Link = mongoose.model("Link", linkSchema);
