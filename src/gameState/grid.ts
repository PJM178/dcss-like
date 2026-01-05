import { AssetTypes } from "@/assets";
import { TileData } from "@/assets/floor/mappings";
import { getAsset } from "@/assets/imageLoader";
import { Renderer } from "@/renderer";
import { weightedRandom } from "@/util/helpers";
import { Enemy } from "./enemy";
import { NPC } from "./npc";

interface CurrentGameGrid {
  image: CanvasImageSource;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  dx: number;
  dy: number;
  dw: number;
  dh: number;
}

export class GridState {
  private currentGameGrid: CurrentGameGrid[] = [];
  private gridDimensions: { w: number, h: number };
  private entityList: (Enemy | NPC)[] = [];

  constructor(dimensions: { w: number, h: number }) {
    this.gridDimensions = dimensions;
  }

  getEntityList() {
    return this.entityList;
  }

  addEntity(entity: Enemy | NPC) {
    this.entityList.push(entity);
  }

  updateCurrentGameGrid(tile: CurrentGameGrid, dimensions: { x: number, y: number }) {
    this.currentGameGrid.push(tile);
  }

  getCurrentGameGrid() {
    return this.currentGameGrid;
  }

  getGridDimensions() {
    return this.gridDimensions;
  }

  generateInitialGameGrid(type: AssetTypes, tileData: TileData, size: { x: number, y: number }, dx?: number, dy?: number) {
    for (let i = 0; i < size.y; i++) {
      for (let j = 0; j < size.x; j++) {
        const variantTotal = tileData.tileWeights.reduce((a, b) => a + b, 0);
        const variantProbabilities = tileData.tileWeights.map((v) => v / variantTotal);
        const variantToUse = weightedRandom(variantProbabilities);
        const { tileInfo } = tileData;
        const selectedTile = tileInfo[variantToUse];

        const tile = {
          image: getAsset(type),
          sx: selectedTile.sx,
          sy: selectedTile.sy,
          sw: selectedTile.w,
          sh: selectedTile.h,
          dx: j * Renderer.TILE_SIZE,
          dy: i * Renderer.TILE_SIZE,
          dw: Renderer.TILE_SIZE,
          dh: Renderer.TILE_SIZE,
        };

        this.currentGameGrid.push(tile);
      }
    }
  }
}