import classes from "./logistics-item.module.css";

function LogisticsItem({ icon: Icon, children }) {
  const { item, icon, content } = classes;

  return (
    <li className={item}>
      <span className={icon}>
        <Icon />
      </span>
      <span className={content}>{children}</span>
    </li>
  );
}

export default LogisticsItem;
