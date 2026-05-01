import mongoose, { Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  projectId: mongoose.Types.ObjectId;
  assignedTo: mongoose.Types.ObjectId;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  dueDate: Date;
}

const taskSchema = new mongoose.Schema<ITask>({
  title: { type: String, required: true },
  description: String,
  projectId: { type: mongoose.Schema.Types.ObjectId,
     ref: "Project",
     required: true
     },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["TODO", "IN_PROGRESS", "DONE"],
    default: "TODO"
  },
  dueDate: Date
}, { timestamps: true });

export default mongoose.model<ITask>("Task", taskSchema);