// Import models
import { IUser } from "../models/userModel";

import { Gender } from "../enums/gender.enum";

import { LoginReturn } from "../interface/LoginReturn";

// Define the UserService interface
export interface IUserService {
  // Register a new admin
  registerAdmin(
    name: string,
    email: string,
    gender: Gender,
    password: string
  ): Promise<IUser>;

  // Register a new Viewer
  registerViewer(
    name: string,
    email: string,
    gender: Gender,
    password: string
  ): Promise<IUser>;

  // Login a user
  login(email: string, password: string): Promise<LoginReturn>;

  // Logout a user
  logout(token: string): Promise<void>;
}
