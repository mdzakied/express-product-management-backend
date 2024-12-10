import bcrypt from "bcrypt";

import User from "../models/userModel";
import { Role } from "../enums/role.enum";

export const initializeAdminAccount = async (): Promise<void> => {
  try {
    // Check if admin account already exists
    const existingAdmin = await User.findOne({ role: Role.ADMIN });

    // If admin account already exists, do not create a new one
    if (existingAdmin) {
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("securePassword123", 10);

    // Create admin account
    const admin = new User({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: Role.ADMIN,
      gender: "Male",
    });

    // Save admin account
    await admin.save();

    // Console log success
    console.log("Admin account initialized successfully");
  } catch (error) {
    console.error("Error initializing admin account:", error);
  }
};
