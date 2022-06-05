import { BONUS } from './objects';
import { SPEED } from './tank';

export const TYPE = {
  BASIC: 'basic',
  FAST: 'fast',
  POWER: 'power',
  ARMORED: 'armored',
};

export const TYPE_ORDER = [
  TYPE.BASIC,
  TYPE.FAST,
  TYPE.POWER,
  TYPE.ARMORED,
];

export const POSITION = [
  [-96, 96],
  [0, 96],
  [96, 96],
];

export const MOVEMENT_SPEED = [SPEED.SLOW, SPEED.FAST, SPEED.SLOW, SPEED.SLOW];

export const PROJECTILE_SPEED = [SPEED.SLOW, SPEED.SLOW, SPEED.FAST, SPEED.SLOW];

export const PROJECTILES_NUMBER = [1, 1, 1, 1];

export const ARMOR_STRENGTH = [0, 0, 0, 3];

export const BONUS_ORDER = [
  BONUS.HELMET,
  BONUS.TIMER,
  BONUS.SHOWEL,
  BONUS.STAR,
  BONUS.GRENADE,
  BONUS.TANK,
  BONUS.STAR,
  BONUS.GRENADE,
];

export const BONUS_CARRIER = {
  '3': true,
  '10': true,
  '17': true,
};
