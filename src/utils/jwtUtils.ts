// Import jwt
import jwt from 'jsonwebtoken';

// Generate token jwt
export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRATION || '1h',
  });
};
