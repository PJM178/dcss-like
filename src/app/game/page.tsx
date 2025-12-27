"use client"

import { assets } from "@/assets";
import GameScreen from "@/components/GameScreen";
import LoadingScreen from "@/components/LoadingScreen";
import LoadingState from "@/components/LoadingState";
import { useAssets } from "@/hooks/useAssets";
import { LoadingState as LoadingStateEnum } from "@/hooks/useAssets";

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