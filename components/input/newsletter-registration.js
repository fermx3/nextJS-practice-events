import { useRef, useState, useContext } from "react";
import NotificationContext from "../../store/notification-context";

import Button from "../ui/button";
import LoadingRing from "../ui/loading-ring";

import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  const [isLoading, setisLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState();
  const [fadeOut, setFadeOut] = useState(false);

  function registrationHandler(event) {
    setisLoading(true);
    event.preventDefault();

    // fetch user input (state or refs)
    const enteredEmail = emailInputRef.current.value;
    // optional: validate input
    const reqBody = {
      email: enteredEmail,
    };

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          setisLoading(false);
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        setisLoading(false);
        emailInputRef.current.value = "";
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
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <Button
            type="newsletter"
            disabledButton={isLoading && "disabledButton"}
          >
            {isLoading ? "Please wait" : "Register"}
            {isLoading && <LoadingRing />}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
