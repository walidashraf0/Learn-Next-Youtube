"use client";
import { getSearchPostsData } from "@/app/apiCalls/getPosts";
import PostItem from "@/components/PostItem/PostItem";
import { Post } from "@/generated/prisma/client";
import { useEffect, useState } from "react";

interface ISearchResultProps {
  searchParams: {
    searchText: string;
  };
}

const Search = ({ searchParams: { searchText } }: ISearchResultProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPostsSearchData = async () => {
      const postsData = await getSearchPostsData(searchText);
      setPosts(postsData);
      setLoading(false);
    };
    getPostsSearchData();
  }, [searchText]);

  return (
    <section className="fix-height container m-auto px-5">
      {loading ? (
        <p className="text-gray-100 text-xl font-bold p-5">Loading...</p>
      ) : posts.length === 0 ? (
        <h2 className="text-gray-800 text-2xl font-bold p-5">
          No posts based on
          <span className="text-red-500 mx-1">{searchText}</span>
          found
        </h2>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2 mt-7 text-gray-800">
            Search Results for
            <span className="ms-1 text-green-700 text-3xl font-bold">
              {searchText}
            </span>
          </h1>
          <div className="flex items-center justify-center flex-wrap gap-7">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Search;
