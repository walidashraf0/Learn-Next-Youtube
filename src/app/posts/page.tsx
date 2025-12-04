"use client";
import PostItem from "@/components/PostItem/PostItem";
import { TPost } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";

const PostsPage = () => {
  const [posts, setPosts] = useState<TPost[]>([]);

  
  const getPosts = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center flex-wrap gap-7">
        {posts?.slice(0, 6).map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default PostsPage;
