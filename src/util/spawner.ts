import { EntityAvatar } from "@/gameState/baseEntity";
import { Enemy } from "@/gameState/enemy";
import { GridState } from "@/gameState/grid";
import { NPC } from "@/gameState/npc";

export class EntitySpawner {
  private gridState: GridState;

  constructor(gridState: GridState) {
    this.gridState = gridState;
  }

  spawnEntity(entity: NPC | Enemy) {
    this.gridState.addEntity(entity);
  }

  getGridState() {
    return this.gridState;
  }
}