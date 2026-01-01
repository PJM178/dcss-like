import { Renderer } from "@/renderer";
import { Button } from "../ui/Buttons";
import { PlayerState } from "@/gameState/player";

interface ControllerProps {
  playerState: PlayerState;
  renderer: Renderer | null;
}

const Controller = (props: ControllerProps) => {
  const { playerState, renderer } = props;

  const handlePlayerDiagonalPositionUpdate = (direction: "up-right" | "down-right" | "down-left" | "up-left") => {
    const { x, y } = playerState.getEntityPosition();

    switch (direction) {
      case "up-right":
        playerState.updateEntityPosition(x + 1, y - 1);
        break;
      case "down-right":
        playerState.updateEntityPosition(x + 1, y + 1);
        break;
      case "down-left":
        playerState.updateEntityPosition(x - 1, y + 1);
        break;
      case "up-left":
        playerState.updateEntityPosition(x - 1, y - 1);
        break;
      default:
        break;
    }

    if (renderer) {
      renderer.frame();
    }
  }

  return (
    <div>
      <Button
        variant="wrapper"
        title="Reload asset"
        aria-label="Reload asset"
        onClick={() => handlePlayerDiagonalPositionUpdate("up-right")}
        style={{ transform: "rotate(45deg)" }}
      >
        <span className={`material-symbol--container material-symbols-outlined`.trim()}>
          arrow_upward
        </span>
      </Button>
      <Button
        variant="wrapper"
        title="Reload asset"
        aria-label="Reload asset"
        onClick={() => handlePlayerDiagonalPositionUpdate("down-right")}
        style={{ transform: "rotate(135deg)" }}
      >
        <span className={`material-symbol--container material-symbols-outlined`.trim()}>
          arrow_upward
        </span>
      </Button>
      <Button
        variant="wrapper"
        title="Reload asset"
        aria-label="Reload asset"
        onClick={() => handlePlayerDiagonalPositionUpdate("down-left")}
        style={{ transform: "rotate(225deg)" }}
      >
        <span className={`material-symbol--container material-symbols-outlined`.trim()}>
          arrow_upward
        </span>
      </Button>
      <Button
        variant="wrapper"
        title="Reload asset"
        aria-label="Reload asset"
        onClick={() => handlePlayerDiagonalPositionUpdate("up-left")}
        style={{ transform: "rotate(315deg)" }}
      >
        <span className={`material-symbol--container material-symbols-outlined`.trim()}>
          arrow_upward
        </span>
      </Button>
    </div>
  );
};

export default Controller;