import { v4 } from 'uuid';

import { getStartPosition } from '../utils/projectile';
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

Projectile.loop = function loop({ frame }) {
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
        // TODO: collisions
        projectile.explosion = 1;
      } else {
        projectile.position = splice(projectile.position, index, changedPosition);
      }
    }

    projectiles.push(projectile);

    return projectiles;
  };
};
