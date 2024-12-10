import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { blacklistTokens } from "../utils/blacklistToken";

// Middleware to verify JWT token
const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Token should be passed as "Bearer <token>"

  // Periksa apakah token ada di blacklist
  if (blacklistTokens.has(token as string)) {
    res.status(401).json({ status: 401, message: "Token has been revoked" });
    return;
  }

  // Check if a token was provided
  if (!token) {
    res.status(401).json({ status: 401, message: "No token provided" });
    return;
  }

  try {
    // Verify the JWT token and decode it
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );

    // Attach the decoded user information to the request object
    res.locals.user = decoded;

    // Proceed to the next middleware/handler
    next();
  } catch (error) {
    // Handle token verification errors
    res.status(401).json({ status: 401, message: "Invalid or expired token" });
    return;
  }
};

export default authMiddleware;
