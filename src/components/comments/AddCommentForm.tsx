"use client";
import { CommentWithUser } from "@/utils/types";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

interface IAddCommentFromProps {
  postId?: number;
  onCommentAdded: (comment: CommentWithUser) => void;
}

const AddCommentForm = ({ postId, onCommentAdded }: IAddCommentFromProps) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText === "") return toast.error("Comment is required");
    try {
      const res = await axios.post<CommentWithUser>(
        `http://localhost:3000/api/comments`,
        {
          text: commentText.trim(),
          postId,
        },
      );
      onCommentAdded(res.data)
      setCommentText("");
      toast.success("Comment Added successfully!");
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4 mx-auto w-full md:w-2/3">
      <input
        type="text"
        placeholder="Add a comment.."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 mb-6"
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:cursor-pointer"
      >
        Add Comment
      </button>
    </form>
  );
};

export default AddCommentForm;
