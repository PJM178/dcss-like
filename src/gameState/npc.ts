import { BaseEntityState, EntityAvatar } from "./baseEntity";
import { GridState } from "./grid";

export class NPC extends BaseEntityState {
  constructor(x: number, y: number, avatar: EntityAvatar, gridState: GridState) {
    super(x, y, avatar, gridState);
  }
}
