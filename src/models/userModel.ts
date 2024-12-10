import mongoose, { Schema, Document } from "mongoose";

import { Gender } from "../enums/gender.enum";
import { Role } from "../enums/role.enum";

// Define the User interface extending from Document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  gender: Gender;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      required: true,
      default: Role.VIEWER, // Default role is VIEWER
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the User model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
