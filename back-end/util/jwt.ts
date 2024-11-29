import jwt from 'jsonwebtoken';

// Define the input type for the JWT token
interface GenerateJwtTokenInput {
  username: string;
}

export const generateJwtToken = ({ username}: GenerateJwtTokenInput): string => {
  const options = {
    expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, // Set expiration time from environment
    issuer: 'course_app',
  };

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    // Include the role in the JWT payload
    return jwt.sign({ username}, process.env.JWT_SECRET, options);
  } catch (error) {
    console.error('Error generating JWT token:', error);
    throw new Error('Error generating JWT token');
  }
};
