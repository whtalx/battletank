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
