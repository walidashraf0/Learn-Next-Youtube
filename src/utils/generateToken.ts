import jwt from "jsonwebtoken";
import { TUserPayload } from "./types";
import { serialize } from "cookie";

// Generate Token
export const generateToken = (userPayload: TUserPayload): string => {
  const token = jwt.sign(userPayload, process.env.JWT_SECRET!, {
    expiresIn: "4d",
  });
  return token;
};

// Set auth cookie with the generated token
export const setCookie = (userPayload: TUserPayload): string => {
  const token = generateToken(userPayload);
  const cookie = serialize("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
  return cookie;
};
