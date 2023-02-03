import { useState, useEffect } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import LoadingSpinner from "../ui/loading-spinner";
import Button from "../ui/button";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [resMessage, setResMessage] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/comments/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
        setIsLoading(false);
        return () => ac.abort(); // Abort both fetches on unmount
      });
  }, [showComments]);

  function toggleCommentsHandler() {
    setResMessage();
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData, clearFields) {
    // send data to API
    setIsSending(true);
    setResMessage();
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResMessage(data.message);
        clearFields();
        setIsSending(false);
      });
  }

  return (
    <section className={classes.comments}>
      <Button onClick={toggleCommentsHandler} type="invertedButton">
        {showComments ? "Hide" : "Show"} Comments
      </Button>
      {showComments && (
        <NewComment
          onAddComment={addCommentHandler}
          isSending={isSending}
          resMessage={resMessage}
        />
      )}
      {showComments && isLoading ? (
        <LoadingSpinner />
      ) : (
        showComments && <CommentList comments={comments} />
      )}
    </section>
  );
}

export default Comments;
