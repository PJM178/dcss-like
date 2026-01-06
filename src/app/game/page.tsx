"use client"

import GameScreen from "@/components/GameScreen";
import LoadingScreen from "@/components/LoadingScreen";
import { useAssets } from "@/hooks/useAssets";

const GameHome = () => {
  const { ready, assetState, loadAsset } = useAssets();

  if (!ready) return (
    <LoadingScreen assetsLoading={assetState} loadAsset={loadAsset} />
  );

  return (
    <GameScreen assetsLoaded={ready} />
  );
};

export default GameHome;