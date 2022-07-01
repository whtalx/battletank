import { v4 } from 'uuid';

import { getCollisionEffects, getStartPosition } from '../utils/projectile';
import { getCollisionBlocks } from '../utils/collisions';
import { splice } from '../utils/iterable';

import PROJECTILE from '../constants/projectile';
import TANK from '../constants/tank';

export function Projectile({ parent, type }) {
  return {
    direction: parent.direction,
    explosion: 0,
    id: v4(),
    parent: parent.id,
    parentType: type,
    position: getStartPosition(parent),
    power: parent.projectilePower,
    speed: parent.projectileSpeed,
  };
}

Projectile.loop = function loop({ frame, state }) {
  return function updateProjectile(projectiles, projectile) {
    if (projectile.explosion) {
      if (frame === 0) {
        if (projectile.explosion >= 3) return projectiles;

        projectile.explosion += 1;
      }
    } else {
      const { index, shift } = TANK.POSITION_SHIFT[projectile.direction];
      const changedPosition = projectile.position[index] + shift * projectile.speed;

      if (Math.abs(changedPosition) > PROJECTILE.POSITION_CONSTRAINT) {
        projectile.explosion = 1;
      } else {
        const newPosition = splice(projectile.position, index, changedPosition);
        const { explosion, ...updates } = getCollisionEffects({
          blocks: getCollisionBlocks({
            direction: projectile.direction,
            map: state.map,
            points: PROJECTILE.COLLISION_POINTS,
            position: newPosition,
          }),
          direction: projectile.direction,
          power: projectile.power,
          state,
        });

        if (explosion) {
          for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
              state[key] = updates[key];
            }
          }

          projectile.explosion = 1;
        } else {
          projectile.position = newPosition;
        }
      }
    }

    projectiles.push(projectile);

    return projectiles;
  };
};
