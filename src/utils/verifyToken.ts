import { NextRequest } from "next/server";
import { TUserPayload } from "./types";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyToken = (request: NextRequest): TUserPayload | null => {
  try {
    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value as string;

    if (!token) {
      return null;
    }

    const privateKey = process.env.JWT_SECRET as string;
    const userPayload = jwt.verify(token, privateKey) as TUserPayload;
    return userPayload;
  } catch (error) {
    return null;
  }
};
