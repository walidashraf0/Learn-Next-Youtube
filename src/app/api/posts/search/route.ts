import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const searchText = await request.nextUrl.searchParams.get("searchText");
    let posts;
    if (searchText) {
      posts = await prisma.post.findMany({
        where: {
          title: {
            equals: searchText,  // script => javascript
            mode: "insensitive",  // Java => Java - java
          },
        },
      });
    } else {
      posts = await prisma.post.findMany({ take: 5 });
    }

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 },
    );
  }
};
