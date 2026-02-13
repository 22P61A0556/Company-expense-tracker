import { model, Schema, type Document } from "mongoose";
import type { UserRole } from "../types/auth";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["employee", "manager"], default: "employee", required: true },
  },
  { timestamps: true },
);

export const User = model<IUser>("User", userSchema);
