import { v4 } from 'uuid';

import ENEMY from '../constants/enemy';
import TANK from '../constants/tank';

function getBonus(index) {
  return ENEMY.BONUS_CARRIER[index]
    ? ENEMY.BONUS_ORDER[Math.floor(Math.random() * ENEMY.BONUS_ORDER.length)]
    : null;
}

export function Enemy({ index = 0, level = 0 }) {
  return {
    armor: ENEMY.ARMOR_STRENGTH[level],
    bonus: getBonus(index),
    direction: TANK.DIRECTION.SOUTH,
    explosion: false,
    id: v4(),
    index,
    position: ENEMY.POSITION[index % ENEMY.POSITION.length],
    projectilesNumber: ENEMY.PROJECTILES_NUMBER[level],
    projectilePower: ENEMY.PROJECTILE_POWER[level],
    projectileSpeed: ENEMY.PROJECTILE_SPEED[level],
    speed: ENEMY.MOVEMENT_SPEED[level],
    type: ENEMY.TYPE_ORDER[level],
  };
}

Enemy.loop = function loop({ frame, nest, state }) {
  return function updateEnemy(enemy) {
    // TODO: state machine
  };
};
