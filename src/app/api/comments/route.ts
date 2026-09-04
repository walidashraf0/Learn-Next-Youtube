import { prisma } from "@/lib/prisma";
import { ICreateNewCommentDto } from "@/utils/types";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

// Create a new comment
export const POST = async (request: NextRequest) => {
  try {
    const user = await verifyToken(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
    }

    const body = (await request.json()) as ICreateNewCommentDto;
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
      return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
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
