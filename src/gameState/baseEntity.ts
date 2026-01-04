import { AI } from "@/controller/ai";
import { GridState } from "./grid";

export interface EntityAvatar {
  w: number;
  h: number;
  sx: number;
  sy: number;
}

export abstract class BaseEntityState {
  protected position: { x: number, y: number };
  protected avatar: EntityAvatar;
  protected gridState: GridState;
  protected id: string;
  protected AI: AI;

  constructor(x: number, y: number, avatar: EntityAvatar, gridState: GridState) {
    this.position = { x, y };
    this.avatar = avatar;
    this.gridState = gridState;
    this.id = crypto.randomUUID();
    this.AI = new AI(this);
  }

  updateEntityPosition(x: number, y: number) {
    const clampedX = this.clampCoordinate(x, "x");
    const clampedY = this.clampCoordinate(y, "y");

    this.position = { x: clampedX, y: clampedY };
  }

  private clampCoordinate(coor: number, axis: "x" | "y") {
    if (coor < 0) {
      return 0;
    }

    if (axis === "x") {
      if (coor >= this.gridState.getGridDimensions().w) {
        return this.gridState.getGridDimensions().w - 1;
      }

      return coor;
    } else {
      if (coor >= this.gridState.getGridDimensions().h) {
        return this.gridState.getGridDimensions().h - 1;
      }

      return coor;
    }
  }

  getEntityPosition(): Readonly<{ x: number; y: number }> {
    return this.position;
  }

  getEntityAvatar() {
    return this.avatar;
  }

  getAI() {
    return this.AI;
  }
}