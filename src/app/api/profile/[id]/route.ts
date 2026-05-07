import { prisma } from "@/utils/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "@/utils/verifyToken";
import { IUpdateUserDto } from "@/utils/dto";
import bcrypt from "bcryptjs";
interface IProps {
  params: { id: string };
}

// Delete user profile
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

// Get user data
export const GET = async (request: NextRequest, { params }: IProps) => {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
    });
    if (!user) {
      return NextResponse.json({ messgae: "User not found!" }, { status: 404 });
    }

    const userAuthToken = verifyToken(request);
    if (userAuthToken === null || userAuthToken.id !== user.id) {
      return NextResponse.json(
        { message: "You are not authorized to view this user!" },
        { status: 403 },
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { messgae: "Internal Server Error!" },
      { status: 500 },
    );
  }
};

// Update User data
export const PUT = async (request: NextRequest, { params }: IProps) => {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });

    if (!user) {
      return NextResponse.json({ messgae: "User not found!" }, { status: 404 });
    }

    const userAuthToken = verifyToken(request);
    if (userAuthToken === null || userAuthToken.id !== user.id) {
      return NextResponse.json(
        { message: "You are not authorized to view this user!" },
        { status: 403 },
      );
    }

    const body = (await request.json()) as IUpdateUserDto;

    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }

    const { username, email, password } = body;

    const updatedUserData = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { username, email, password },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { message: "User Data Updated Successfully!", user: updatedUserData },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { messgae: "Internal Server Error!" },
      { status: 500 },
    );
  }
};
