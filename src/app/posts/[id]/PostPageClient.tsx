"use client";

import { useEffect, useState } from "react";
import { getSinglePost } from "@/app/apiCalls/getPosts";
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { SinglePostWithComments } from "@/utils/types";

const PostPageClient = ({
  id,
  isLoggedIn,
}: {
  id: string;
  isLoggedIn: boolean;
}) => {
  const [post, setPost] = useState<SinglePostWithComments | null>(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const data: SinglePostWithComments = await getSinglePost(id);
        console.log(data);
        setPost(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [id]);

  return (
    <>
      <div className="mx-auto mx-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <article className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
          <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-6 py-8 sm:px-8">
            <div className="mb-4 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-white/80">
              Post
            </div>
            <h1 className="text-3xl font-bold tracking-light text-white sm:text-4xl">
              {post?.title ?? "Loading Article"}
            </h1>
          </div>

          <div className="space-y-6 px-6 py-8 sm:px-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <span className="text-sm font-medium text-slate-500">
                Post #{post?.id ?? "-"}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                Community
              </span>
            </div>

            <p className="whitespace-pre-line text-base leading-8 text-slate-700">
              {post?.content ?? "Loading content"}
            </p>
          </div>
        </article>

        <section className="mx-auto mt-10 w-full max-w-3xl">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Comments</h2>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
              {post?.comments?.length ?? 0} total
            </span>
          </div>

          <div className="mt-7">
            {isLoggedIn ? (
              <AddCommentForm
                postId={post?.id}
                onCommentAdded={(comment) => {
                  setPost((currentPost) =>
                    currentPost
                      ? {
                          ...currentPost,
                          comments: [...currentPost.comments, comment],
                        }
                      : currentPost,
                  );
                }}
              />
            ) : (
              <span className="text-blue-600 md:text-xl">
                To Write a comment, Please log in
              </span>
            )}
          </div>

          <div className="space-y-4">
            {post?.comments?.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default PostPageClient;
