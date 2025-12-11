"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchPostInput = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/posts/searchResult?query=${searchText}`);
    // console.log({ searchText });
  };

  return (
    <form onSubmit={handleSubmit} className="my-4 mx-auto w-full md:w-2/3">
      <input
        type="search"
        id="search"
        placeholder="Enter Search text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
    </form>
  );
};

export default SearchPostInput;
