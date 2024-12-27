import mongoose, { Schema, Document } from "mongoose";

import { UserGenderEnum } from "../enums/UserGenderEnum";
import { UserRoleEnum } from "../enums/UserRoleEnum";

// Define the User interface extending from Document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  gender: UserGenderEnum;
  role: UserRoleEnum;
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
      enum: Object.values(UserGenderEnum),
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRoleEnum),
      required: true,
      default: UserRoleEnum.VIEWER, // Default role is VIEWER
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the User model
const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
