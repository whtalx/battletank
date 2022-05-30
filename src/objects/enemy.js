import { ENEMY, TANK } from '../constants';

function getBonus(index) {
  return ENEMY.BONUS_CARRIER[index]
    ? ENEMY.BONUS_ORDER[Math.random() * ENEMY.BONUS_ORDER.length]
    : null;
}

export default function Enemy({ index = 0, level = 0 }) {
  return {
    armor: ENEMY.ARMOR_STRENGTH[level],
    bonus: getBonus(index),
    direction: TANK.DIRECTION.SOUTH,
    explosionTimeout: 0,
    index,
    level,
    position: ENEMY.POSITION[index % ENEMY.POSITION.length],
    projectiles: {},
    projectileSpeed: ENEMY.PROJECTILE_SPEED[level],
    projectilesNumber: ENEMY.PROJECTILES_NUMBER[level],
    speed: ENEMY.MOVEMENT_SPEED[level],
  };
}
