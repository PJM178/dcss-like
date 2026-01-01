// import { GridState } from "./grid";

import { BaseEntityState, EntityAvatar } from "./baseEntity";
import { GridState } from "./grid";

// interface PlayerAvatar {
//   w: number;
//   h: number;
//   sx: number;
//   sy: number;
// }

// export class PlayerState {
//   private position: { x: number, y: number };
//   private avatar: PlayerAvatar;
//   private gridState: GridState;

//   constructor(x: number, y: number, avatar: PlayerAvatar, gridState: GridState) {
//     this.position = { x, y };
//     this.avatar = avatar;
//     this.gridState = gridState;
//   }

//   updatePlayerPosition(x: number, y: number) {
//     const clampedX = this.clampCoordinate(x, "x");
//     const clampedY = this.clampCoordinate(y, "y");

//     this.position = { x: clampedX, y: clampedY };
//   }

//   private clampCoordinate(coor: number, axis: "x" | "y") {
//     if (coor < 0) {
//       return 0;
//     }

//     if (axis === "x") {
//       if (coor >= this.gridState.getGridDimensions().w) {
//         return this.gridState.getGridDimensions().w - 1;
//       }

//       return coor;
//     } else {
//       if (coor >= this.gridState.getGridDimensions().h) {
//         return this.gridState.getGridDimensions().h - 1;
//       }

//       return coor;
//     }
//   }

//   getPlayerPosition() {
//     return this.position;
//   }

//   getPlayerAvatar() {
//     return this.avatar;
//   }
// }

export class PlayerState extends BaseEntityState {
  constructor(x: number, y: number, avatar: EntityAvatar, gridState: GridState) {
    super(x, y, avatar, gridState);
  }
}