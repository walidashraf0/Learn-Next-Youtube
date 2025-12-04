interface ICommentItemProps {
  comment: string;
}

const CommentItem = ({ comment }: ICommentItemProps) => {
  return (
    <div className="flex gap-3 py-4 border-b border-gray-200">
      <p className="text-gray-700">{comment}</p>
    </div>
  );
};

export default CommentItem;
