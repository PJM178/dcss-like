"use client"

import { floorMappings } from "@/assets/floor/mappings";
import { getAsset, loadImage } from "@/assets/imageLoader";
import { overworldGrid } from "@/gameData/overworld";
import { useAssets } from "@/hooks/useAssets";
import { Renderer } from "@/renderer";
import { useEffect, useRef } from "react";

interface GameScreenProps {
  assetsLoaded: boolean;
}

const GameScreen = (props: GameScreenProps) => {
  const gameView = useRef<HTMLCanvasElement>(null);

  function drawGameWorld() {

  }

  useEffect(() => {
    if (gameView.current) {
      if (props.assetsLoaded) {
        const renderer = new Renderer(gameView.current);
        
        for (let i = 0; i < overworldGrid.height; i++) {
          for (let j = 0; j < overworldGrid.width; j++) {
            renderer.drawTile("floor", floorMappings["grass"], j, i);
          }
        }
        renderer.drawTile("player", floorMappings["grass"], 0, 0);
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