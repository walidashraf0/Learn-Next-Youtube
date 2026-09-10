import { Post } from "@/generated/prisma/client";
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
