import { use } from "react";
import PostPageClient from "./PostPageClient";
import { cookies } from "next/headers";
import { verifyTokenPage } from "@/utils/verifyToken";

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const token = (await cookies()).get("jwtToken")?.value || "";
  const payload = await verifyTokenPage(token);

  return <PostPageClient id={id} isLoggedIn={Boolean(payload)} />;
};

export default PostPage;
