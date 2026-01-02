import { AI } from "@/controller/ai";
import { BaseEntityState, EntityAvatar } from "./baseEntity";
import { GridState } from "./grid";

export class NPC extends BaseEntityState {
  AI: AI;

  constructor(x: number, y: number, avatar: EntityAvatar, gridState: GridState) {
    super(x, y, avatar, gridState);
    this.AI = new AI(this);
  }
}
