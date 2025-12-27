import { LoadingState as LoadingStateEnum } from "@/hooks/useAssets";
import LoadingState from "./LoadingState";
import styles from "./LoadingScreen.module.css";
import { Button } from "./ui/Buttons";

interface LoadingScreenProps {
  assetsLoading: Record<string, LoadingStateEnum>;
  loadAsset: (ass: string) => void;
}

const LoadingScreen = (props: LoadingScreenProps) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["assets--container"]}>
        {Object.entries(props.assetsLoading).map(([k, v], index) => (
          <div
            key={index}
            className={styles["assets--asset"]}
          >
            Asset {k}: <LoadingState state={v} /> {v === LoadingStateEnum.Failure &&
              <Button
                variant="wrapper"
                title="Reload asset"
                aria-label="Reload asset"
                onClick={() => props.loadAsset(k)}
              >
                <span className={`material-symbol--container material-symbols-outlined`.trim()}>
                  refresh
                </span>
              </Button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;