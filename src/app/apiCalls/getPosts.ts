import axios from "axios";

export const getPosts = async (page: string) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/posts?page=${page}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
