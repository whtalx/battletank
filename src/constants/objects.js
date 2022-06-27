const BLOCK = {
  BASE: 'base',
  BRICK: 'brick',
  EMPTY: 'empty',
  ICE: 'ice',
  STEEL: 'steel',
  TREE: 'tree',
  WATER: 'water',
};

const STAGE = 'stage';

const SHIELD = 'shield';

const LIVES = 'lives';

const UNIT = 'unit';

const PROJECTILE = 'projectile';

const HIT = 'hit';

const BONUS = {
  GRENADE: 'grenade',
  HELMET: 'helmet',
  SHOWEL: 'showel',
  STAR: 'star',
  TANK: 'tank',
  TIMER: 'timer',
};

const BLOCK_TYPE_ORDER = [
  null,
  BLOCK.BRICK,
  BLOCK.STEEL,
  BLOCK.TREE,
  BLOCK.ICE,
  BLOCK.WATER,
  BLOCK.BASE,
];

export default {
  BLOCK_TYPE_ORDER,
  BLOCK,
  BONUS,
  HIT,
  LIVES,
  PROJECTILE,
  SHIELD,
  STAGE,
  UNIT,
};
