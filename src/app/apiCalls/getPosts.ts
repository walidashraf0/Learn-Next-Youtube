import { Post } from "@/generated/prisma/client";
import { SinglePostWithComments } from "@/utils/types";
import axios from "axios";

export const getPosts = async (page: string) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/posts?page=${page}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Get Posts data based on search Text
export const getSearchPostsData = async (
  searchText: string,
): Promise<Post[]> => {
  const res = await axios.get(
    `http://localhost:3000/api/posts/search?searchText=${searchText}`,
  );
  return res.data;
};

export const getSinglePost = async (postId: string): Promise<SinglePostWithComments> => {
  const res = await axios.get(`http://localhost:3000/api/posts/${postId}`);
  return res.data.post;
}
