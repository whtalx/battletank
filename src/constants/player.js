import { COLORS, SPEED } from './tank';

export const TYPE = {
  BASIC: 'p-basic',
  DOUBLE_SHOT: 'p-double',
  FAST_SHOT: 'p-fast',
  POWER_SHOT: 'p-power',
};

export const TYPE_ORDER = [
  TYPE.BASIC,
  TYPE.FAST_SHOT,
  TYPE.DOUBLE_SHOT,
  TYPE.POWER_SHOT,
];

export const POSITION = [
  [-32, -96],
  [32, -96],
];

export const MOVEMENT_SPEED = [SPEED.NORMAL, SPEED.NORMAL, SPEED.NORMAL, SPEED.NORMAL];

export const PROJECTILE_SPEED = [SPEED.SLOW, SPEED.FAST, SPEED.FAST, SPEED.FAST];

export const PROJECTILE_POWER = [1, 1, 1, 2];

export const PROJECTILES_NUMBER = [1, 1, 2, 2];

export const SHIELD_TIMEOUT = {
  SPAWN: 120,
  BONUS: 600,
};

export const IMMOBILITY_TIMEOUT = 192;

export const COLORS_ORDER = [
  COLORS.YELLOW,
  COLORS.GREEN,
];
