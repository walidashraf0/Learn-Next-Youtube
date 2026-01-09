import { posts } from "@/utils/data";
import { IUpdatePostDTO } from "@/utils/dto";
import { NextRequest, NextResponse } from "next/server";

interface ISinglePostProps {
  params: { id: string };
}

// GET Single Post
export const GET = (request: NextRequest, { params }: ISinglePostProps) => {
  const post = posts.find((p) => p.id === parseInt(params.id));
  if (!post) {
    return NextResponse.json({ message: "Post Not Found" }, { status: 404 });
  }
  return NextResponse.json({ message: post }, { status: 200 });
};

// PUT Post Data
export const PUT = async (request: NextRequest, { params }: ISinglePostProps) => {
  const post = posts.find((p) => p.id === parseInt(params.id));
  const data = (await request.json()) as IUpdatePostDTO;
  if (!post) {
    return NextResponse.json({ message: "Post Not Found" }, { status: 404 });
  }
  return NextResponse.json({ message: "post updated" }, { status: 200 });
};

// DELETE Post
export const DELETE = async (request: NextRequest, { params }: ISinglePostProps) => {
  const post = posts.find((p) => p.id === parseInt(params.id));
  if (!post) {
    return NextResponse.json({ message: "Post Not Found" }, { status: 404 });
  }
  return NextResponse.json({ message: "post deleted" }, { status: 200 });
};

