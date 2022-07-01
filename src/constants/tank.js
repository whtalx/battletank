import { Color } from 'three';

import LAYOUT from './layout';
import COLOR from '../data/colors.json';

const EXPLOSION = 'explosion';

const IMMOBILITY = 'immobility';

const SHIELD = 'shield';

const DIRECTION = {
  NORTH: 'n',
  EAST: 'e',
  SOUTH: 's',
  WEST: 'w',
};

const DIRECTION_ORDER = [
  DIRECTION.NORTH,
  DIRECTION.WEST,
  DIRECTION.SOUTH,
  DIRECTION.EAST,
];

const SIZE = LAYOUT.BLOCK_SIZE;

const COLLISION_SHIFT = SIZE / 2;

const COLLISION_POINTS = [
  [-COLLISION_SHIFT, COLLISION_SHIFT],
  [COLLISION_SHIFT, COLLISION_SHIFT],
];

const POSITION_CONSTRAINT = (LAYOUT.MAP_SIZE - SIZE) / 2;

const SHIFT = 1;

const POSITION_SHIFT = {
  [DIRECTION.NORTH]: { index: 1, shift: SHIFT },
  [DIRECTION.WEST]: { index: 0, shift: -SHIFT },
  [DIRECTION.SOUTH]: { index: 1, shift: -SHIFT },
  [DIRECTION.EAST]: { index: 0, shift: SHIFT },
};

const STATUS = {
  EXPLODING: 'exploding',
  IDLE: 'idle',
  MOVING: 'moving',
  SLIDING: 'sliding',
};

const SPEED = {
  SLOW: 2,
  NORMAL: 3,
  FAST: 4,
};

const EXPLOSION_TIMEOUT = 60;

const COLORS = {
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

const ROTATION = {
  [DIRECTION.EAST]: true,
  [DIRECTION.NORTH]: false,
  [DIRECTION.SOUTH]: false,
  [DIRECTION.WEST]: true,
};

const TRANSFORM = {
  [DIRECTION.EAST]: [-1, 1],
  [DIRECTION.NORTH]: [1, 1],
  [DIRECTION.SOUTH]: [1, -1],
  [DIRECTION.WEST]: [-1, -1],
};

export default {
  EXPLOSION,
  IMMOBILITY,
  SHIELD,
  DIRECTION,
  DIRECTION_ORDER,
  SIZE,
  COLLISION_POINTS,
  COLLISION_SHIFT,
  POSITION_CONSTRAINT,
  SHIFT,
  POSITION_SHIFT,
  STATUS,
  SPEED,
  EXPLOSION_TIMEOUT,
  COLORS,
  ROTATION,
  TRANSFORM,
};
