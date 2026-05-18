import { IUpdateCommentDto } from "@/utils/dto";
import { prisma } from "@/utils/lib/prisma";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

// Update Comment
export const PUT = async (request: NextRequest, { params }: Props) => {
  try {
    const { id } = await params;
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!comment) {
      return NextResponse.json(
        { message: "Comment Not Found!" },
        { status: 404 },
      );
    }

    const user = verifyToken(request);
    if (user === null || user.id !== comment.userId) {
      return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
    }

    const body = (await request.json()) as IUpdateCommentDto;

    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: {
        text: body.text,
      },
    });

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 },
    );
  }
};

// Delete Comment
export const DELETE = async (request: NextRequest, { params }: Props) => {
  try {
    const { id } = await params;
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!comment) {
      return NextResponse.json(
        { message: "Comment Not Found!" },
        { status: 404 },
      );
    }

    const user = verifyToken(request);
    if (user === null) {
      return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
    }

    if (user.id === comment.userId || user.isAdmin) {
      await prisma.comment.delete({ where: { id: parseInt(id) } });
      return NextResponse.json(
        { message: "Comment Deleted!" },
        { status: 200 },
      );
    }

    return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 },
    );
  }
};
