import PostItem from "@/components/PostItem/PostItem";
import { TPost } from "@/utils/types";

const PostsPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts",
    { cache: "no-store" }
  )


  if(!res.ok) {
throw new Error("Failed to get Data!")
  }


  const posts: TPost[] = await res.json();



  return (
    <>
      <div className="flex items-center justify-center flex-wrap gap-7">
        {posts?.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}

export default PostsPage
