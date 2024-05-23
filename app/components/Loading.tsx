import { SyncLoader } from "react-spinners";
import styles from "@/styles/Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["content"]}>
        <SyncLoader color="#ececec" size={15} />
        <h1>Loading</h1>
      </div>
    </div>
  );
};

export default Loading;
