import { v4 } from 'uuid';

import { splice } from '../utils/iterable';

import { LAYOUT, PLAYER, TANK } from '../constants';

export default function Player({ index = 0, level = 0, ...rest }) {
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
    projectileSpeed: PLAYER.PROJECTILE_SPEED[level],
    shield: false,
    speed: PLAYER.MOVEMENT_SPEED[level],
    type: PLAYER.TYPE_ORDER[level],
    ...rest,
  };
}

Player.reset = function reset({ nest }) {
  return function resetPlayer(player) {
    nest.deleteIn([player.id, 'explosion']);
    nest.deleteIn([player.id, 'immobility']);
    nest.setIn([player.id, 'shield'], PLAYER.SHIELD_TIMEOUT.SPAWN);

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

Player.loop = function loop({ frame, nest }) {
  return function updatePlayer(player) {
    if (player.explosion) {
      const explosionTimeout = nest.getIn([player.id, 'explosion'], 0) - 1;

      if (explosionTimeout) {
        nest.setIn([player.id, 'explosion'], explosionTimeout);
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
    } else if (player.immobility) {
      const immobilityTimeout = nest.getIn([player.id, 'immobility'], 0) - 1;

      if (immobilityTimeout) {
        nest.setIn([player.id, 'immobility'], immobilityTimeout);
      } else {
        player.immobility = false;
        nest.deleteIn([player.id, 'immobility']);
      }
    } else {
      if (player.shield) {
        const shieldTimeout = nest.getIn([player.id, 'shield'], 0) - 1;

        if (shieldTimeout) {
          nest.setIn([player.id, 'shield'], shieldTimeout);
        } else {
          player.shield = false;
          nest.deleteIn([player.id, 'shield']);
        }
      }

      if (player.moving && frame % player.speed) {
        const { index, shift } = TANK.POSITION_SHIFT[player.direction];
        const changedPosition = player.position[index] + shift;

        if (Math.abs(changedPosition) + TANK.CENTER <= LAYOUT.MAP_SIZE / 2) {
          // TODO: collisions
          player.position = splice(player.position, index, changedPosition);
        } else {
          player.moving = false;
        }
      }
    }
  };
};
