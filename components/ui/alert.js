import classes from "./alert.module.css";

function Alert({ children, smallAlert }) {
  return (
    <div className={`${classes.alert} ${smallAlert && classes.smallAlert}`}>
      {children}
    </div>
  );
}

export default Alert;
