import { User } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { setCookie } from "@/utils/generateToken";
import { IRegisterUserDto, TUserPayload } from "@/utils/types";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const POST = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as IRegisterUserDto;
    const createNewUserSchema = z.object({
      username: z.string().min(5).max(15),
      email: z.string().min(2).max(200).email(),
      password: z.string().min(6),
    });

    const validation = createNewUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) {
      return NextResponse.json(
        { message: "This user is already existed" },
        { status: 400 },
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(body.password, salt);

    const newUserData = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hasedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const newUserPayload: TUserPayload = {
      id: newUserData.id,
      username: newUserData.username,
      isAdmin: newUserData.isAdmin,
    };
    console.log(newUserPayload + "newUserPayload");

    const cookie = setCookie(newUserPayload);

    return NextResponse.json(
      { ...newUserData, message: "User registered successfully" },
      { status: 201, headers: { "Set-Cookie": cookie } },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
