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
import Controller from "./input/Controller";
import EnemySpawner from "./spawner/EnemySpawner";
import { EntitySpawner } from "@/util/spawner";

interface GameScreenProps {
  assetsLoaded: boolean;
}

const GameScreen = (props: GameScreenProps) => {
  const gameView = useRef<HTMLCanvasElement>(null);
  const gridStateRef = useRef(new GridState({ w: overworldGrid.width, h: overworldGrid.height }));
  const playerStateRef = useRef(new PlayerState(3, 3, tile_info[3], gridStateRef.current));
  const rendererRef = useRef<Renderer>(new Renderer(playerStateRef.current, gridStateRef.current));
  const spawnerRef = useRef<EntitySpawner>(new EntitySpawner(gridStateRef.current));
  // 861 index
  const npc = "";

  useEffect(() => {
    if (gameView.current) {
      if (props.assetsLoaded) {
        rendererRef.current.initializeCanvas(gameView.current);
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
      const playerController = new PlayerController(playerStateRef.current, rendererRef.current);

      return () => playerController.dispose();
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
        This is the rendered game screen
      </canvas>
      <Controller renderer={rendererRef.current} playerState={playerStateRef.current} />
      <EnemySpawner enemySpawner={spawnerRef.current} />
    </div>
  );
}

export default GameScreen;