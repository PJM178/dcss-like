import { BaseEntityState } from "@/gameState/baseEntity";

export class AI {
  private entity: BaseEntityState;

  constructor(entity: BaseEntityState) {
    this.entity = entity;
  }

  wander() {
    const prob = Math.random();

    if (prob < 0.5) {
      return;
    }

    if (prob > 0.5) {
      const x = Math.random() > 0.5 ? Math.random() > 0.5 ? 1 : -1 : 0;
      const y = Math.random() > 0.5 ? Math.random() > 0.5 ? 1 : -1 : 0;

      this.entity.updateEntityPosition(x + this.entity.getEntityPosition().x, y + this.entity.getEntityPosition().y);
    }
  }
}