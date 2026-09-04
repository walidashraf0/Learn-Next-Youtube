import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "@/utils/verifyToken";
import { IUpdateUserDto } from "@/utils/types";
import bcrypt from "bcryptjs";

interface Props {
  params: { id: string };
}

export const DELETE = async (request: NextRequest, { params }: Props) => {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { comments: true }
    });
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    const userAuthToken = verifyToken(request);

    if (userAuthToken !== null && userAuthToken.id === user.id) {
      await prisma.user.delete({ where: { id: parseInt(params.id) } });
      // const commentIds = user?.comments.map((comment) => comment.id)
      // await prisma.comment.deleteMany({  
      //   where: { id: { in: commentIds } }
      // })
      return NextResponse.json(
        { message: "User deleted successfully!" },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: "You are not authorized to delete this user!" },
      { status: 403 },
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        message: "Internal Server Error!",
      },
      { status: 500 },
    );
  }
};

export const GET = async (request: NextRequest, { params }: Props) => {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        isAdmin: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
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
      { message: "Internal Server Error!" },
      { status: 500 },
    );
  }
};

export const PUT = async (request: NextRequest, { params }: Props) => {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }
    const userAuthToken = verifyToken(request);

    if (userAuthToken === null || userAuthToken.id !== user.id) {
      return NextResponse.json(
        { message: "You are not authorized to update this user!" },
        { status: 403 },
      );
    }

    const body = (await request.json()) as IUpdateUserDto;

    if (body.password) {
      if (body.password.length < 6) {
        return NextResponse.json(
          { message: "Password must be at least 6 characters long!" },
          { status: 400 },
        );
      }
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }

    const { username, email, password } = body;

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { username, email, password },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        isAdmin: true,
      },
    });
    return NextResponse.json(
      { message: "User updated successfully!", user: updatedUser },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 },
    );
  }
};
