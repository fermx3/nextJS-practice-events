import classes from "./loading-ring.module.css";

const LoadingRing = () => {
  return (
    <div className={classes.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingRing;
