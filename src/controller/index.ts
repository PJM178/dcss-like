import { PlayerState } from "@/gameState/player";
import { keyList } from "./keyList";
import { Renderer } from "@/renderer";
import { tile_info } from "@/assets/player/mappings";

export class PlayerController {
  private playerState: PlayerState;
  private renderer: Renderer;

  constructor(playerState: PlayerState, renderer: Renderer) {
    this.renderer = renderer;
    this.playerState = playerState;
    this.initializeMovement();
  }

  initializeMovement() {
    document.body.addEventListener("keydown", this.handleKeydown);
  }

  private handleKeydown = (ev: KeyboardEvent) => {
    if (keyList[ev.code as keyof typeof keyList]) {
      ev.preventDefault();
    }

    const { x, y } = this.playerState.getEntityPosition();

    if (ev.code === "ArrowRight") {
      this.playerState.updateEntityPosition(x + 1, y);
    } else if (ev.code === "ArrowLeft") {
      this.playerState.updateEntityPosition(x - 1, y);
    } else if (ev.code === "ArrowUp") {
      this.playerState.updateEntityPosition(x, y - 1);
    } else if (ev.code === "ArrowDown") {
      this.playerState.updateEntityPosition(x, y + 1);
    }

    this.renderer.frame();
  }

  dispose() {
    document.body.removeEventListener("keydown", this.handleKeydown);
  }
}