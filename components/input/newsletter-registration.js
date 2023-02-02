import { useRef, useState } from "react";
import ErrorAlert from "../ui/error-alert";

import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const [isLoading, setisLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState();

  function registrationHandler(event) {
    setResponseMessage(undefined);
    setisLoading(true);
    event.preventDefault();

    // fetch user input (state or refs)
    const enteredEmail = emailInputRef.current.value;
    // optional: validate input
    const reqBody = {
      email: enteredEmail,
    };

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setisLoading(false);
        setResponseMessage(data.message);
        emailInputRef.current.value = "";
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
          <button
            disabled={isLoading}
            className={isLoading ? classes.disabledButton : undefined}
          >
            {isLoading ? "Please wait" : "Register"}
          </button>
        </div>
        {responseMessage && (
          <ErrorAlert>
            <p className={classes.responseMessage}>{responseMessage}</p>
          </ErrorAlert>
        )}
      </form>
    </section>
  );
}

export default NewsletterRegistration;
