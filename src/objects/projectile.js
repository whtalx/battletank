import { v4 } from 'uuid';

export function Projectile({ direction, parent, position, power, speed }) {
  return {
    direction,
    explosion: false,
    id: v4(),
    parent,
    position,
    power,
    speed,
  };
}

Projectile.loop = function loop({ frame, nest, state }) {
  return function updateProjectile(projectile) {
    if (projectile.speed > frame) {
      // TODO: collisions
    }
  };
};
