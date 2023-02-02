import classes from "./loading-spinner.module.css";

const LoadingSpinner = () => {
  const { spinner, dot } = classes;

  return (
    <div className={spinner}>
      <div className={dot}></div>
      <div className={dot}></div>
      <div className={dot}></div>
    </div>
  );
};

export default LoadingSpinner;
