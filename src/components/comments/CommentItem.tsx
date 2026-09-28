import { CommentWithUser } from "@/utils/types";

interface ICommentItemProps {
  comment: CommentWithUser;
}

const CommentItem = ({ comment }: ICommentItemProps) => {
  return (
    <article className="w-full max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-sm font-bold text-white shadow-sm">
          {comment.user?.username?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between gap-3">
            {comment.user?.username ? (
              <span className="text-sm font-semibold text-slate-800">
                {comment.user?.username}
              </span>
            ) : "Unknown User"}
            <span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-indigo-600">
              Comment
            </span>
          </div>
          <p className="text-sm leading-6 text-slate-600">
            {comment.text}
          </p>
        </div>
      </div>
    </article>
  );
};

export default CommentItem;
