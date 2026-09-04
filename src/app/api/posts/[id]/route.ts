import { prisma } from "@/lib/prisma";
import { IUpdatePostDTO } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

interface IGetPostProps {
  params: { id: string };
}

export const GET = async (request: NextRequest, { params }: IGetPostProps) => {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      comments: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }
  return NextResponse.json({ message: post }, { status: 200 });
};

export const PUT = async (request: NextRequest, { params }: IGetPostProps) => {
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });
    const data = (await request.json()) as IUpdatePostDTO;
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title: data.title,
        content: data.content,
      },
    });
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: IGetPostProps,
) => {
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: { comments: true },
    });
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });
    const commentIds: number[] = post?.comments.map((comment) => comment.id);
    await prisma.comment.deleteMany({
      where: { id: { in: commentIds } },
    });
    return NextResponse.json({ message: "Post Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
