import { prisma } from "@/utils/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "@/utils/verifyToken";
interface IProps {
  params: { id: string };
}

export const DELETE = async (request: NextRequest, { params }: IProps) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userAuthToken = verifyToken(request);

    if (userAuthToken !== null && userAuthToken.id === user.id) {
      await prisma.user.delete({ where: { id: parseInt(params.id) } });
      return NextResponse.json(
        { message: "User deleted Successfully" },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: "You are not authorized to delete this user!" },
      { status: 403 },
    );
  } catch (error) {
    return NextResponse.json(
      { messgae: "Internal Server Error" },
      { status: 500 },
    );
  }
};
