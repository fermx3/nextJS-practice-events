import { useState, useEffect, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import LoadingSpinner from "../ui/loading-spinner";
import Button from "../ui/button";

import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // const ac = new AbortController();
    setIsLoading(true);

    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsLoading(false);
          // return () => ac.abort(); // Abort both fetches on unmount
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData, clearFields) {
    // send data to API
    setIsSending(true);

    notificationCtx.showNotification({
      title: "Publishing comment...",
      message: "Your comment is being posted.",
      status: "pending",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          setIsSending(false);
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        clearFields();
        setIsSending(false);
        notificationCtx.showNotification({
          title: "Success!",
          message: data.message,
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <Button
        onClick={toggleCommentsHandler}
        url={`/events/${eventId}/#comments`}
      >
        {showComments ? "Hide" : "Show"} Comments
      </Button>
      {showComments && (
        <NewComment onAddComment={addCommentHandler} isSending={isSending} />
      )}
      {showComments && isLoading ? (
        <div>
          <LoadingSpinner />
          <p>Loading Comments...</p>
        </div>
      ) : (
        showComments && <CommentList comments={comments} />
      )}
    </section>
  );
}

export default Comments;
