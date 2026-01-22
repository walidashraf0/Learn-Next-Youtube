import { posts } from "@/utils/data";
import { IUpdatePostDTO } from "@/utils/dto";
import { prisma } from "@/utils/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface ISinglePostProps {
  params: { id: string };
}

// GET Single Post
export const GET = async (
  request: NextRequest,
  { params }: ISinglePostProps,
) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!post) {
      return NextResponse.json({ message: "Post Not Found" }, { status: 404 });
    }
    return NextResponse.json({ message: post }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
};

// PUT Post Data
export const PUT = async (
  request: NextRequest,
  { params }: ISinglePostProps,
) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(params.id) },
    });
    const data = (await request.json()) as IUpdatePostDTO;
    if (!post) {
      return NextResponse.json({ message: "Post Not Found" }, { status: 404 });
    }
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(params.id) },
      data: {
        title: data.title,
        content: data.content,
      },
    });
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
};

// DELETE Post
export const DELETE = async (
  request: NextRequest,
  { params }: ISinglePostProps,
) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!post) {
      return NextResponse.json({ message: "Post Not Found" }, { status: 404 });
    }
    await prisma.post.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ message: "Post Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
};
