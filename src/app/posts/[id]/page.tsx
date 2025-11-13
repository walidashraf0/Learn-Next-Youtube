import { TPost } from "@/utils/types";

const PostPage = async ({params}: {params: Promise<{ id: string }>})  => {
  const { id } = await params;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  const post: TPost = await res.json();

  return (
    <div className="p-2 md:w-2/5 bg-gray-400 border-2 border-blue-400 rounded-md">
      <h2 className="text-2xl font-bold text-green-400">
        {post.title} <span className="text-2xl">{post.id}</span>
      </h2>
      <p className="text-sm text-gray-600">{post.body}</p>
    </div>
  );
};

export default PostPage;
