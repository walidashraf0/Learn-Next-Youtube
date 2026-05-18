import { ICreateNewComment } from "@/utils/dto";
import { prisma } from "@/utils/lib/prisma";
import { createCommentSchema } from "@/utils/validation";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

// Create New Comment
export const POST = async (request: NextRequest) => {
  try {
    const user = await verifyToken(request);
    if (!user) {
      return NextResponse.json({ message: "UnAuthorized!" }, { status: 401 });
    }

    const body = (await request.json()) as ICreateNewComment;

    const validation = createCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.message },
        { status: 400 },
      );
    }

    const { text, postId } = body;

    const newComment = await prisma.comment.create({
      data: {
        text,
        postId,
        userId: user.id,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 },
    );
  }
};

// Get all comments
export const GET = async (request: NextRequest) => {
  try {
    const user = await verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json({ message: "UnAuthorized!" }, { status: 401 });
    }

    const comments = await prisma.comment.findMany();
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 },
    );
  }
};
