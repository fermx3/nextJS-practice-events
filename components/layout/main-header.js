import Link from "next/link";
import classes from "./main-header.module.css";

const MainHeader = () => {
  const { header, logo, navigation } = classes;

  return (
    <header className={header}>
      <div className={logo}>
        <Link href="/">NextEvents</Link>
      </div>
      <nav className={navigation}>
        <ul>
          <li>
            <Link href="/events">Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
