import { AssetTypes } from "@/assets";
import { TileData } from "@/assets/floor/mappings";
import { getAsset } from "@/assets/imageLoader";
import { GridState } from "@/gameState/grid";
import { PlayerState } from "@/gameState/player";
import { weightedRandom } from "@/util/helpers";

export class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private playerState: PlayerState;
  private gridState: GridState;
  public static TILE_SIZE = 32;
  public static TILES_PER_ROW = 32;
  public static CAMERA_TILE_DISTANCE = 10;
  public static CAMERA_VIEW_X = Renderer.CAMERA_TILE_DISTANCE * Renderer.TILE_SIZE + Renderer.TILE_SIZE;
  public static CAMERA_VIEW_Y = Renderer.CAMERA_TILE_DISTANCE * Renderer.TILE_SIZE + Renderer.TILE_SIZE;
  private currentGameGrid: { image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number }[] = [];

  constructor(canvas: HTMLCanvasElement, playerState: PlayerState, gridState: GridState) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.playerState = playerState;
    this.gridState = gridState;
  }

  frame = () => {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const offsetX = Math.max(0, this.playerState.getPlayerPosition().x - Renderer.CAMERA_TILE_DISTANCE / 2);
      const offsetY = Math.max(0, this.playerState.getPlayerPosition().y - Renderer.CAMERA_TILE_DISTANCE / 2);

      const offsetXPixels = offsetX * Renderer.TILE_SIZE;
      const offsetYPixels = offsetY * Renderer.TILE_SIZE;

      for (let i = 0; i < this.gridState.getCurrentGameGrid().length; i++) {
        const { image, sx, sy, sw, sh, dx, dy, dw, dh } = this.gridState.getCurrentGameGrid()[i];


        if (dx >= offsetXPixels && dx < (Renderer.CAMERA_VIEW_X + offsetXPixels) && dy >= offsetYPixels && dy < (Renderer.CAMERA_VIEW_Y + offsetYPixels)) {
          this.ctx.drawImage(image, sx, sy, sw, sh, dx - offsetXPixels, dy - offsetYPixels, dw, dh);
        }
      }

      this.drawCharacter(
        this.playerState.getPlayerPosition().x - offsetX,
        this.playerState.getPlayerPosition().y - offsetY,
        this.playerState.getPlayerAvatar().w,
        this.playerState.getPlayerAvatar().h,
        this.playerState.getPlayerAvatar().sx,
        this.playerState.getPlayerAvatar().sy
      );
    }

    // This will keep the loop running at 60 fps, recursively calling this function on every animation frame
    // For "this" context it's important to have this function to be an arrow function
    // requestAnimationFrame(this.frame);
  }

  getCurrentGameGrid() {
    return this.currentGameGrid;
  }

  drawCharacter(dx: number, dy: number, sw: number, sh: number, sx: number, sy: number) {
    if (this.ctx) {
      this.ctx.drawImage(
        getAsset("player"),
        sx,
        sy,
        sw,
        sh,
        dx * Renderer.TILE_SIZE,
        dy * Renderer.TILE_SIZE,
        Renderer.TILE_SIZE,
        Renderer.TILE_SIZE,
      );
    }
  }

  drawTile(type: AssetTypes, tileData: TileData, dx: number, dy: number) {
    const variantTotal = tileData.variants.reduce((a, b) => a + b, 0);
    const variantProbabilities = tileData.variants.map((v) => v / variantTotal);
    const variantToUse = weightedRandom(variantProbabilities);
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