import { PLAYER, TANK } from '../constants';

export default function Player({ index = 0, level = 0 }) {
  return {
    armor: 0,
    direction: TANK.DIRECTION.NORTH,
    explosionTimeout: 0,
    level,
    lives: 3,
    immobilityTimeout: 0,
    index,
    position: PLAYER.POSITION[index],
    projectiles: {},
    projectileSpeed: PLAYER.PROJECTILE_SPEED[level],
    projectilesNumber: PLAYER.PROJECTILES_NUMBER[level],
    shieldTimeout: PLAYER.SHIELD_TIMEOUT.SPAWN,
    speed: PLAYER.MOVEMENT_SPEED[level],
  };
}
