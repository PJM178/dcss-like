import { AssetTypes } from "@/assets";
import { TileData } from "@/assets/floor/mappings";
import { getAsset } from "@/assets/imageLoader";
import { weightedRandom } from "@/util/helpers";

export class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private static TILE_SIZE = 32;
  private static TILES_PER_ROW = 32;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  drawTile(type: AssetTypes, tileData: TileData, dx: number, dy: number) {
    // Equal chance from the variants specified in the object, should be an argument or something like that to control it
    const variantTotal = tileData.variants.reduce((a, b) => a + b, 0);
    const variantProbabilities = tileData.variants.map((v) => v / variantTotal);
    const variantToUse = weightedRandom(variantProbabilities);
    // const randomVariant = Math.floor(Math.random() * tileData.variants);
    const { index, variants } = tileData;
    const tileRow = Math.floor(index / Renderer.TILES_PER_ROW) - 1;
    const tileCol = index % Renderer.TILES_PER_ROW + variantToUse;

    if (this.ctx) {
      this.ctx.drawImage(
        getAsset(type),
        tileCol * Renderer.TILE_SIZE,
        tileRow * Renderer.TILE_SIZE,
        Renderer.TILE_SIZE,
        Renderer.TILE_SIZE,
        dx * Renderer.TILE_SIZE,
        dy * Renderer.TILE_SIZE,
        Renderer.TILE_SIZE,
        Renderer.TILE_SIZE,
      );
    }
  }
}