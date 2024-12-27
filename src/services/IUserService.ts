import { IUser } from "../models/UserModel";
import { UserGenderEnum } from "../enums/UserGenderEnum";

// Define the UserService interface
export interface IUserService {
  // Register a new admin
  registerAdmin(
    name: string,
    email: string,
    gender: UserGenderEnum,
    password: string
  ): Promise<IUser>;

  // Register a new Viewer
  registerViewer(
    name: string,
    email: string,
    gender: UserGenderEnum,
    password: string
  ): Promise<IUser>;

  // Login a user
  login(email: string, password: string): Promise<string>;

  // Logout a user
  logout(token: string): Promise<void>;
}
