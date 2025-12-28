export interface TileData {
  variants: number[];
  index: number;
  canStand: boolean;
  effects: null;
}

export type MappingType = Record<string, TileData>;

export const floorMappings: MappingType = {
  greyBrick: {
    // TODO: fix
    variants: [2],
    index: 320,
    canStand: true,
    effects: null,
  },
  greyBrickMoss: {
    // TODO: fix
    variants: [4],
    index: 322,
    canStand: true,
    effects: null,
  },
  grass: {
    variants: [150, 20, 10, 20, 10, 3, 2, 2, 1, 2, 1],
    index: 448,
    canStand: true,
    effects: null,
  },
};