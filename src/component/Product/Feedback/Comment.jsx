import CommentItem from './CommentItem';

const Comment = () => {
  return (
    <div>
      <div>
        <CommentItem />
      </div>
      <div className="bg-slate-400 ml-12 px-4 py-6 mt-4 space-y-6 rounded-lg">
        <CommentItem />
        <CommentItem />
      </div>

    </div>
  );
};

export default Comment;
