"use client"

import { getAsset, loadImage } from "@/assets/imageLoader";
import { useAssets } from "@/hooks/useAssets";
import { useEffect, useRef } from "react";

interface GameScreenProps {
  assetsLoaded: boolean;
}

const GameScreen = (props: GameScreenProps) => {
  const gameView = useRef<HTMLCanvasElement>(null);

  function draw(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(getAsset("floor"), 32, 32, 32, 32, 32, 32, 32, 32);
      ctx.fillStyle = "rgb(200 0 0)";
      ctx.fillRect(100, 100, 50, 50);

      ctx.fillStyle = "rgb(0 0 200 / 50%)";
      ctx.fillRect(30, 30, 50, 50);
    }
  }

  useEffect(() => {
    if (gameView.current) {
      console.log(gameView.current?.getContext("2d"));
      if (props.assetsLoaded) {
        console.log(getAsset("floor"));
        draw(gameView.current);
      }
    }
  }, [props.assetsLoaded]);

  return (
    <div>
      <canvas ref={gameView} id="gameView" height="1280" width="1120">
        This is the rendered game screen
      </canvas>
    </div>
  );
};

export default GameScreen;