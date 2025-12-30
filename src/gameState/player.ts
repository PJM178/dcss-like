import { GridState } from "./grid";

interface PlayerAvatar {
  w: number;
  h: number;
  sx: number;
  sy: number;
}

export class PlayerState {
  private position: { x: number, y: number };
  private avatar: PlayerAvatar;
  private gridState: GridState;

  constructor(x: number, y: number, avatar: PlayerAvatar, gridState: GridState) {
    this.position = { x, y };
    this.avatar = avatar;
    this.gridState = gridState;
  }

  updatePlayerPosition(x: number, y: number) {
    const { w, h } = this.gridState.getGridDimensions();

    if (x < 0) {
      if (y < 0) {
        return this.position = { x: 0, y: 0 };
      }

      return this.position = { x: 0, y };
    }

    if (y < 0) {
      if (x < 0) {
        return this.position = { x: 0, y: 0 };
      }

      return this.position = { x, y: 0 };
    }

    if (x >= w) {
      if (y >= h) {
        return this.position = { x: w - 1, y: h - 1 };
      }

      return this.position = { x: w - 1, y };
    }

    if (y >= h) {
      if (x >= w) {
        return this.position = { x: w - 1, y: h - 1 };
      }

      return this.position = { x, y: h - 1 };
    }

    this.position = { x, y };
  }

  getPlayerPosition() {
    return this.position;
  }

  getPlayerAvatar() {
    return this.avatar;
  }
}