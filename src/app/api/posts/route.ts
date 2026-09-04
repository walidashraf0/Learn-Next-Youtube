import { Post } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ICreatePostDTO } from "@/utils/types";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (request: NextRequest) => {
  try {
    const pageNumber = request.nextUrl.searchParams.get("page") || "1";
    const POSTS_PER_PAGE = 6;
    const allPosts = await prisma.post.findMany({
      skip: (parseInt(pageNumber) - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
    });

    return NextResponse.json(allPosts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 },
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const user = await verifyToken(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
    }
    const body = (await request.json()) as ICreatePostDTO;

    const createPostSchema = z.object({
      title: z
        .string()
        .min(5, "Title must be at least 5 characters long")
        .max(100),
      content: z.string().min(10),
    });

    const validation = createPostSchema.safeParse(body);

    if (!validation.success) {
      console.log(validation.error.issues[0].message);
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    }

    const newPost: Post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: user.id,
      },
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 },
    );
  }
};
