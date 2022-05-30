import { SPEED } from './tank';

export const POSITION = [
  [4, 12],
  [8, 12],
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
