import { AssetTypes } from "@/assets";
import { TileData } from "@/assets/floor/mappings";
import { getAsset } from "@/assets/imageLoader";
import { Renderer } from "@/renderer";
import { weightedRandom } from "@/util/helpers";

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

  constructor(dimensions: { w: number, h: number }) {
    this.gridDimensions = dimensions;
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
        const variantTotal = tileData.variants.reduce((a, b) => a + b, 0);
        const variantProbabilities = tileData.variants.map((v) => v / variantTotal);
        const variantToUse = weightedRandom(variantProbabilities);
        const { index, variants } = tileData;
        const tileRow = Math.floor(index / Renderer.TILES_PER_ROW) - 1;
        const tileCol = index % Renderer.TILES_PER_ROW + variantToUse;

        const tile = {
          image: getAsset(type),
          sx: tileCol * Renderer.TILE_SIZE,
          sy: tileRow * Renderer.TILE_SIZE,
          sw: Renderer.TILE_SIZE,
          sh: Renderer.TILE_SIZE,
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