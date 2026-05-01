import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "MEMBER";
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["ADMIN", "MEMBER"],
        default: "MEMBER"
    }
}, {
    timestamps: true
});

export default mongoose.model<IUser>("User", userSchema);