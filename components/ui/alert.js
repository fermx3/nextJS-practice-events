import classes from "./alert.module.css";

function Alert({ children, smallAlert, fadeOut }) {
  return (
    <div
      className={`${classes.alert} ${smallAlert && classes.smallAlert} ${
        fadeOut && classes.fadeOut
      }`}
    >
      {children}
    </div>
  );
}

export default Alert;
