"use client"

import { floorMappings } from "@/assets/floor/mappings";
import { getAsset, loadImage } from "@/assets/imageLoader";
import { tile_info } from "@/assets/player/mappings";
import { PlayerController } from "@/controller";
import { overworldGrid } from "@/gameData/overworld";
import { GridState } from "@/gameState/grid";
import { PlayerState } from "@/gameState/player";
import { Renderer } from "@/renderer";
import { useEffect, useRef } from "react";

interface GameScreenProps {
  assetsLoaded: boolean;
}

const GameScreen = (props: GameScreenProps) => {
  const gameView = useRef<HTMLCanvasElement>(null);
  const gridStateRef = useRef(new GridState({ w: overworldGrid.width, h: overworldGrid.height }));
  const playerStateRef = useRef(new PlayerState(3, 3, tile_info[3], gridStateRef.current));
  const rendererRef = useRef<Renderer>(null);

  useEffect(() => {
    if (gameView.current) {
      if (props.assetsLoaded) {
        rendererRef.current = new Renderer(gameView.current, playerStateRef.current, gridStateRef.current);

        // Generating initial grid
        gridStateRef.current.generateInitialGameGrid("floor", floorMappings["grass"], { x: 35, y: 40 });

        // Drawing the frame based on the game state - rendering is purely done by the rendering class, state is updated by
        // state classes and controller, so when a gamestate is required to be forwarded, frame method of the rendering class
        // should be called and be made sure that the game state has been updated where necessary 
        rendererRef.current.frame();
      }
    }
  }, [props.assetsLoaded]);

  // Things to be loaded only on mount, i.e. only once
  useEffect(() => {
    if (gameView.current && rendererRef.current) {
      const controller = new PlayerController(playerStateRef.current, rendererRef.current);

      return () => controller.dispose();
    }
  }, [props.assetsLoaded]);

  return (
    <div>
      <canvas
        ref={gameView}
        id="gameView"
        height={Renderer.CAMERA_VIEW_Y}
        width={Renderer.CAMERA_VIEW_X}
        style={{ height: Renderer.CAMERA_VIEW_Y * 2, width: Renderer.CAMERA_VIEW_X * 2 }}
      >
        {/* <canvas ref={gameView} id="gameView" height="672" width="672"> */}
        This is the rendered game screen
      </canvas>
    </div>
  );
}

export default GameScreen;