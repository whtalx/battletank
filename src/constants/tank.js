export const DIRECTION = {
  NORTH: 'n',
  EAST: 'e',
  SOUTH: 's',
  WEST: 'w',
};

export const DIRECTION_ORDER = [
  DIRECTION.NORTH,
  DIRECTION.WEST,
  DIRECTION.SOUTH,
  DIRECTION.EAST,
];

export const SIZE = 16;

export const CENTER = SIZE / 2;

export const SHIFT = 1.25;

export const POSITION_SHIFT = {
  [DIRECTION.NORTH]: { index: 1, shift: SHIFT },
  [DIRECTION.WEST]: { index: 0, shift: SHIFT },
  [DIRECTION.SOUTH]: { index: 1, shift: -SHIFT },
  [DIRECTION.EAST]: { index: 0, shift: -SHIFT },
};

export const STATUS = {
  EXPLODING: 'exploding',
  IDLE: 'idle',
  MOVING: 'moving',
  SLIDING: 'sliding',
};

export const SPEED = {
  SLOW: 2,
  NORMAL: 3,
  FAST: 4,
};

export const EXPLOSION_TIMEOUT = 60;
