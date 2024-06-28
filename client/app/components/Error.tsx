import styles from "@/styles/Error.module.scss";

const Error = () => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["content"]}>
        <h1>Something went wrong. Please try again later.</h1>
      </div>
    </div>
  );
};

export default Error;
