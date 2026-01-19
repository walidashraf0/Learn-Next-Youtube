import { Post } from "@/generated/prisma/client";
import { ICreatePostDTO } from "@/utils/dto";
import { prisma } from "@/utils/lib/prisma";
import { createPostSchema } from "@/utils/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as ICreatePostDTO;

    const validation = createPostSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    }

    const newPost: Post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
};
