"use client";
import Pagination from "@/components/Pagination/Pagination";
import PostItem from "@/components/PostItem/PostItem";
import SearchPostInput from "@/components/SearchPostInput/SearchPostInput";
import { Post } from "@/generated/prisma/client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPosts } from "../apiCalls/getPosts";

const PostsPage = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getPosts(page);
      setPosts(postsData);
      setLoading(false);
    };
    fetchPosts();
  }, [page]);

  // console.log(posts);

  return (
    <>
      <div className="container m-auto px-4">
        <SearchPostInput />
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-wrap gap-7">
            {posts?.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        )}
        <Pagination />
      </div>
    </>
  );
};

export default PostsPage;
