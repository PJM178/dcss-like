import { LoadingState as LoadingStateEnum } from "@/hooks/useAssets";
import styles from "./LoadingState.module.css";

interface LoadingStateProps {
  state: LoadingStateEnum;
}

const LoadingState = (props: LoadingStateProps) => {
  const stateText: Record<LoadingStateEnum, string> = {
    "loading": "loading",
    "success": "ok",
    "failure": "failed",
    "idle": "",
  };

  return (
    <span className={`${styles["state--" + props.state]} ${styles["state--base"]}`}>{stateText[props.state]}</span>
  );
};

export default LoadingState;