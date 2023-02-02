import classes from "./comment-list.module.css";

function CommentList({ comments }) {
  if (comments.length === 0) {
    return <p>There is no comments for this post. Start the conversation!</p>;
  }

  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {comments.map((comment) => (
        <li key={comment._id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
