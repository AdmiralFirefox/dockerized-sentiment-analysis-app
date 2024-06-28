import Link from "next/link";
import SmileyIcon from "./Icons/SmileyIcon";
import ListIcon from "./Icons/ListIcon";
import styles from "@/styles/Navbar.module.scss";

const Navbar = () => {
  return (
    <header className={styles["navbar-wrapper"]}>
      <div className={styles["content"]}>
        <Link href="/">
          <span className={styles["svg-wrapper"]}>
            <SmileyIcon width="2.85em" height="2.85em" />
          </span>
          <h1>NLP Sentiment Analysis</h1>
        </Link>

        <Link href="/saved_results">
          <ListIcon width="3em" height="3em" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
