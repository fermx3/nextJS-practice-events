import { useRef, useState } from "react";
import Alert from "../ui/alert";
import Button from "../ui/button";
import LoadingRing from "../ui/loading-ring";

import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const [isLoading, setisLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState();
  const [fadeOut, setFadeOut] = useState(false);

  function registrationHandler(event) {
    setResponseMessage(undefined);
    setisLoading(true);
    setFadeOut(false);
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
        setTimeout(() => {
          setFadeOut(true);
        }, 2000);
        setTimeout(() => {
          setResponseMessage();
        }, 3000);
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
        {responseMessage && (
          <Alert smallAlert="true" fadeOut={fadeOut}>
            <p className={classes.responseMessage}>{responseMessage}</p>
          </Alert>
        )}
      </form>
    </section>
  );
}

export default NewsletterRegistration;
