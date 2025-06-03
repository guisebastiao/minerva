import styles from "@/components/Loading/style.module.css";
import { Oval } from "react-loader-spinner";

export const Loading = () => {
  return (
    <div className={styles.content}>
      <Oval
        width={20}
        height={20}
        strokeWidth={5}
        color="#FFFFFF"
        secondaryColor="#9b9b9f"
      />
    </div>
  );
};
