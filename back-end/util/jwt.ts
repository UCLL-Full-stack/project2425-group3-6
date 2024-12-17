import jwt from 'jsonwebtoken';

interface GenerateJwtTokenInput {
  username: string;
}

export const generateJwtToken = ({ username}: GenerateJwtTokenInput): string => {
  const options = {
    expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, 
    issuer: 'course_app',
  };

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    return jwt.sign({ username}, process.env.JWT_SECRET, options);
  } catch (error) {
    console.error('Error generating JWT token:', error);
    throw new Error('Error generating JWT token');
  }
};
