import { assets } from "@/assets";
import { getAsset, loadImage } from "@/assets/imageLoader";
import { useEffect, useState } from "react";

export enum LoadingState {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Failure = "failure",
};

export function useAssets() {
  const assetsToLoad = ["floor", "wall", "test"];
  const [assetState, setAssetState] = useState<Record<string, LoadingState>>(
    Object.fromEntries(assetsToLoad.map((ass) => [ass, LoadingState.Loading]))
  );
  const ready = Object.entries(assetState).map((ass) => ass[1]).every((v) => v === LoadingState.Success);

  function loadAsset(ass: string) {
    setAssetState(prev => {
      return (
        { ...prev, [ass]: LoadingState.Loading }
      );
    });

    loadImage(ass, `/assets/tiles/${ass}.png`)
      .then((res) => {
        console.log("Successfully loaded asset: ", ass)
        setAssetState(prev => {
          return (
            { ...prev, [ass]: Math.random() > 0.5 ? LoadingState.Success : LoadingState.Failure }
          );
        })
      })
      .catch((err) => setAssetState(prev => {
        return (
          { ...prev, [ass]: LoadingState.Failure }
        );
      }));
  }

  useEffect(() => {
    function bootstrap() {
      assetsToLoad.forEach((ass) => {
        loadAsset(ass);
      });
    };

    bootstrap();
  }, []);

  return { ready, assetState, loadAsset };
}