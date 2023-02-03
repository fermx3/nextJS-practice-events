import Link from "next/link";

import classes from "./button.module.css";

const Button = ({ children, url, onClick, type, disabledButton }) => {
  if (url) {
    return (
      <Link href={url}>
        <a
          className={`${type ? classes[type] : classes.btn} ${
            disabledButton && classes.disabledButton
          }`}
          onClick={onClick}
          disabled={disabledButton}
        >
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button
      className={`${type ? classes[type] : classes.btn} ${
        disabledButton && classes.disabledButton
      }`}
      onClick={onClick}
      disabled={disabledButton}
    >
      {children}
    </button>
  );
};

export default Button;
