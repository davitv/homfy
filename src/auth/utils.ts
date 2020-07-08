import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const encryptPassword = (plainPassword: string) => {
  return bcrypt.hash(plainPassword, 10);
}

export const comparePassword = (hashedPassword: string, plainPassword: string) => {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export const getAccessToken = (userId: number): string => {
  return jwt.sign({userId}, process.env.ACCESS_TOKEN_KEY!);
}

export const decodeJWT = (token: string): {userId: number} => {
  return jwt.decode(token) as {userId: number};
}
