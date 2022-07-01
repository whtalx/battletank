import { v4 } from 'uuid';

import { getPlayerTankPosition } from '../utils/tank';
import { getCollisionBlocks } from '../utils/collisions';
import { areEqual, splice } from '../utils/iterable';

import PLAYER from '../constants/player';
import TANK from '../constants/tank';

export function Player({ index = 0, level = 0, ...rest }) {
  return {
    direction: TANK.DIRECTION.NORTH,
    explosion: false,
    immobility: false,
    id: v4(),
    index,
    level,
    lives: 3,
    moving: false,
    position: PLAYER.POSITION[index],
    projectilesNumber: PLAYER.PROJECTILES_NUMBER[level],
    projectilePower: PLAYER.PROJECTILE_POWER[level],
    projectileSpeed: PLAYER.PROJECTILE_SPEED[level],
    shield: false,
    speed: PLAYER.MOVEMENT_SPEED[level],
    type: PLAYER.TYPE_ORDER[level],
    ...rest,
  };
}

Player.reset = function reset({ nest }) {
  return function resetPlayer(player) {
    nest.deleteIn([player.id, TANK.EXPLOSION]);
    nest.deleteIn([player.id, TANK.IMMOBILITY]);
    nest.setIn([player.id, TANK.SHIELD], PLAYER.SHIELD_TIMEOUT.SPAWN);

    return {
      ...player,
      direction: TANK.DIRECTION.NORTH,
      explosion: false,
      immobility: false,
      moving: false,
      position: PLAYER.POSITION[player.index],
      shield: true,
    };
  };
};

Player.loop = function loop({ frame, nest, state }) {
  return function updatePlayer(players, player) {
    if (player.explosion) {
      const explosionTimeout = nest.getIn([player.id, TANK.EXPLOSION], 0) - 1;

      if (explosionTimeout) {
        nest.setIn([player.id, TANK.EXPLOSION], explosionTimeout);
      } else {
        player.lives -= 1;

        if (player.lives) {
          const updates = Player.reset({ nest })({
            level: 0,
            projectileSpeed: PLAYER.PROJECTILE_SPEED[0],
            projectilesNumber: PLAYER.PROJECTILES_NUMBER[0],
            speed: PLAYER.MOVEMENT_SPEED[0],
          });

          for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
              player[key] = updates[key];
            }
          }
        }
      }
    } else {
      if (player.shield) {
        const shieldTimeout = nest.getIn([player.id, TANK.SHIELD], 0) - 1;

        if (shieldTimeout) {
          nest.setIn([player.id, TANK.SHIELD], shieldTimeout);
        } else {
          player.shield = false;
          nest.deleteIn([player.id, TANK.SHIELD]);
        }
      }

      if (player.immobility) {
        const immobilityTimeout = nest.getIn([player.id, TANK.IMMOBILITY], 0) - 1;

        if (immobilityTimeout) {
          nest.setIn([player.id, TANK.IMMOBILITY], immobilityTimeout);
        } else {
          player.immobility = false;
          nest.deleteIn([player.id, TANK.IMMOBILITY]);
        }
      } else if (player.moving && player.speed > frame) {
        const { index, shift } = TANK.POSITION_SHIFT[player.direction];
        const changedPosition = player.position[index] + shift;

        if (Math.abs(changedPosition) <= TANK.POSITION_CONSTRAINT) {
          let newPosition = splice(player.position, index, changedPosition);
          newPosition = getPlayerTankPosition({
            blocks: getCollisionBlocks({
              direction: player.direction,
              map: state.map,
              points: TANK.COLLISION_POINTS,
              position: newPosition,
            }),
            direction: player.direction,
            newPosition,
            position: player.position,
          });

          if (!areEqual(newPosition, player.position)) {
            player.position = newPosition;
          }
        } else {
          player.moving = false;
        }
      }
    }

    players.push(player);

    return players;
  };
};
