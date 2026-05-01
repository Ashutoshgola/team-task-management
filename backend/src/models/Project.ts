import mongoose, { Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  description: string;
  createdBy: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
}

const projectSchema = new mongoose.Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

export default mongoose.model<IProject>("Project", projectSchema);