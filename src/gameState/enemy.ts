import { AI } from "@/controller/ai";
import { BaseEntityState, EntityAvatar } from "./baseEntity";
import { GridState } from "./grid";

export class Enemy extends BaseEntityState {
  AI: AI = new AI(this);

  constructor(x: number, y: number, avatar: EntityAvatar, gridState: GridState) {
    super(x, y, avatar, gridState);
  }
}