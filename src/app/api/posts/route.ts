import { posts } from "@/utils/data";
import { ICreatePostDTO } from "@/utils/dto";
import { TPost } from "@/utils/types";
import { createPostSchema } from "@/utils/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
  console.log(request);
  return NextResponse.json(posts, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const body = (await request.json()) as ICreatePostDTO;

  const validation = createPostSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { message: validation.error.issues[0].message },
      { status: 400 }
    );
  }

  const newPost: TPost = {
    id: posts.length + 1,
    userId: 5,
    title: body.title,
    body: body.body,
  };
  posts.push(newPost);
  return NextResponse.json(newPost, { status: 201 });
};
