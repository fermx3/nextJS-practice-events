import Link from "next/link";

import classes from "./button.module.css";

const Button = ({ children, url, onClick }) => {
  if (url) {
    return (
      <Link href={url}>
        <a className={classes.btn}>{children}</a>
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
