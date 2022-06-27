import LAYOUT from './layout';

const PARENT = {
  PLAYER: 'player',
  ENEMY: 'enemy',
};

const SIZE = LAYOUT.BLOCK_PATTERN;

const POSITION_CONSTRAINT = (LAYOUT.MAP_SIZE - SIZE) / 2;

export default {
  PARENT,
  POSITION_CONSTRAINT,
  SIZE,
};
