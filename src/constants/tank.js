import { Color } from 'three';

import COLOR from '../data/colors.json';

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

export const COLORS = {
  GRAY: [
    ...(new Color(COLOR['0C']).toArray()),
    ...(new Color(COLOR['10']).toArray()),
    ...(new Color(COLOR['20']).toArray()),
  ],
  GREEN: [
    ...(new Color(COLOR['0A']).toArray()),
    ...(new Color(COLOR['1A']).toArray()),
    ...(new Color(COLOR['3B']).toArray()),
  ],
  RED: [
    ...(new Color(COLOR['04']).toArray()),
    ...(new Color(COLOR['16']).toArray()),
    ...(new Color(COLOR['20']).toArray()),
  ],
  YELLOW: [
    ...(new Color(COLOR['18']).toArray()),
    ...(new Color(COLOR['27']).toArray()),
    ...(new Color(COLOR['38']).toArray()),
  ],
};
