
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { IUserService } from "../IUserService";
import UserRepository from "../../repositories/UserRepository";

import UserModel, { IUser }  from "../../models/UserModel";
import { UserRoleEnum } from "../../enums/UserRoleEnum";

import { blacklistTokens } from "../../utils/blacklistToken";

export class UserService implements IUserService {
  // Register a new admin
  async registerAdmin(
    name: string,
    email: string,
    password: string,
    gender: string
  ): Promise<IUser> {
    try {
      // Check if name or email already exists from repository
      const existingUser = await UserRepository.findByName(name);
      const existingEmail = await UserRepository.findByEmail(email);

      if (existingUser) {
        throw new Error("User already exists!");
      } else if (existingEmail) {
        throw new Error("Email already exists!");
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
        gender,
        role: UserRoleEnum.ADMIN,
      });

      // Save user to repository
      await UserRepository.create(newUser);

      // Return user
      return newUser;
    } catch (error: any) {
      // Throw error
      throw new Error(
        error.message || "Something went wrong during registration!"
      );
    }
  }

  // Register a new viewer
  async registerViewer(
    name: string,
    email: string,
    password: string,
    gender: string
  ): Promise<IUser> {
    try {
      // Check if name or email already exists from repository
      const existingUser = await UserRepository.findByName(name);
      const existingEmail = await UserRepository.findByEmail(email);

      if (existingUser) {
        throw new Error("User already exists!");
      } else if (existingEmail) {
        throw new Error("Email already exists!");
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
        gender,
        role: UserRoleEnum.VIEWER,
      });

      // Save user to repository
      await UserRepository.create(newUser);

      // Return user
      return newUser;
    } catch (error: any) {
      // Throw error
      throw new Error(
        error.message || "Something went wrong during registration!"
      );
    }
  }

  // Login a user
  async login(email: string, password: string): Promise<string> {
    try {
      // Check if user exists from repository
      const user = await UserRepository.findByEmail(email);
      if (!user) {
        throw new Error("User not found!");
      }

      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Incorrect password!");
      }

      // JWT secret
      const JWT_SECRET = process.env.JWT_SECRET;

      // Check if JWT secret is defined
      if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined!");
      }

      // Generate token
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" } // Token expires in 1 hour
      );

      // Return token
      return token;
    } catch (error: any) {
      // Throw error
      throw new Error(error.message || "Something went wrong during login!");
    }
  }

  // Logout a user
  async logout(token: string): Promise<void> {
    // Add token to blacklist
    await blacklistTokens.add(token);

    // Decode the JWT to get the expiration time
    const decoded: any = jwt.decode(token);

    // If decoding was successful and the token has an expiry time
    if (decoded?.exp) {
      // Calculate how much time remains until the token expires
      const expiryTime = decoded.exp * 1000 - Date.now();

      // Set a timeout to remove the token from blacklist after it expires
      setTimeout(() => {
        blacklistTokens.delete(token);
      }, expiryTime);
    }
  }
}

// Create an instance of the UserService
export const userService = new UserService();
