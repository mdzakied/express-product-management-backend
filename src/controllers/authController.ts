// Import express
import { Request, Response } from "express";

import { IUser } from "../models/userModel";

import { userService } from "../services/impl/UserService";

// Register a new admin
export const registerAdminController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // Destructure the request body
  const { name, email, password, gender } = req.body;

  // Manual validation
  if (!name || !email || !password || !gender) {
    return res.status(400).json({
      status: 400,
      message: "All fields (name, email, password, gender) are required.",
    });
  }

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid email format. example: example@example.com",
    });
  }

  // Validate password strength (minimum 8 characters)
  if (password.length < 8) {
    return res.status(400).json({
      status: 400,
      message: "Password must be at least 8 characters long.",
    });
  }

  // Validate gender (it should be male, female, or other)
  if (!["Male", "Female"].includes(gender)) {
    return res.status(400).json({
      status: 400,
      message: "Gender must be one of the following: Male, Female.",
    });
  }

  try {
    // Call the service to register the user
    const newUser: IUser = await userService.registerAdmin(
      name,
      email,
      password,
      gender
    );

    // Send the response back to the client
    return res.status(201).json({
      status: 201,
      message: "Admin registered successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        gender: newUser.gender,
        role: newUser.role,
      },
    });
  } catch (error: any) {
    console.error(error);

    // Check if the error is an instance of Error and cast it accordingly
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong!";
    return res.status(500).json({ status: 500, message: errorMessage });
  }
};

// Register a new viewer
export const registerViewerController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // Destructure the request body
  const { name, email, password, gender } = req.body;

  // Manual validation
  if (!name || !email || !password || !gender) {
    return res.status(400).json({
      status: 400,
      message: "All fields (name, email, password, gender) are required.",
    });
  }

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid email format. example: example@example.com",
    });
  }

  // Validate password strength (minimum 8 characters)
  if (password.length < 8) {
    return res.status(400).json({
      status: 400,
      message: "Password must be at least 8 characters long.",
    });
  }

  // Validate gender (it should be male, female, or other)
  if (!["Male", "Female"].includes(gender)) {
    return res.status(400).json({
      status: 400,
      message: "Gender must be one of the following: Male, Female.",
    });
  }

  try {
    // Call the service to register the user
    const newUser: IUser = await userService.registerViewer(
      name,
      email,
      password,
      gender
    );

    // Send the response back to the client
    return res.status(201).json({
      status: 201,
      message: "Viewer registered successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        gender: newUser.gender,
        role: newUser.role,
      },
    });
  } catch (error: any) {
    console.error(error);

    // Check if the error is an instance of Error and cast it accordingly
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong!";
    return res.status(500).json({ status: 500, message: errorMessage });
  }
};

// Login a user
export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // Destructure the request body
  const { email, password } = req.body;

  try {
    // Destructure the returned token and user
    const { token, user } = await userService.login(email, password);

    // Send the response back to the client
    return res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (error: any) {
    // Check if the error is an instance of Error and cast it accordingly
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong!";
    return res.status(500).json({ status: 500, message: errorMessage });
  }
};

// Logout a user
export const logoutController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  try {
    // Validate token presence
    if (!token) {
      return res
        .status(400)
        .json({ status: 400, message: "No token provided!" });
    }

    // Perform logout by invalidating the token
    await userService.logout(token);

    // Respond with success message
    return res.status(200).json({
      status: 200,
      message: "User logged out successfully",
    });
  } catch (error: any) {
    // Check if the error is an instance of Error and cast it accordingly
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong!";
    return res.status(500).json({ status: 500, message: errorMessage });
  }
};
