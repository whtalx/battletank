import { getPatternCollisionType } from './collisions';

import COLLISIONS from '../constants/collisions';
import OBJECTS from '../constants/objects';
import LAYOUT from '../constants/layout';
import TANK from '../constants/tank';

const spectrum = LAYOUT.PATTERN_SIDE;

export function getPlayerTankPosition({ direction, blocks, newPosition, position }) {
  function reduceBlocks(result, block) {
    switch (block.type) {
      case OBJECTS.BLOCK.BASE:
      case OBJECTS.BLOCK.BRICK:
      case OBJECTS.BLOCK.STEEL:
      case OBJECTS.BLOCK.WATER: {
        switch (getPatternCollisionType({ direction, block, spectrum })) {
          case COLLISIONS.TYPE.PASS: {
            break;
          }

          case COLLISIONS.TYPE.DETOUR: {
            if (result.type === COLLISIONS.TYPE.PASS) {
              result.type = COLLISIONS.TYPE.DETOUR;
              result.block = block;
            } else {
              result.type = COLLISIONS.TYPE.COLLIDE;
            }

            break;
          }

          default: {
            result.type = COLLISIONS.TYPE.COLLIDE;
            break;
          }
        }

        break;
      }

      default: {
        break;
      }
    }

    return result;
  }

  function getBlockCenter({ block, pattern, point }) {
    return point
      ? (block - 1) * LAYOUT.BLOCK_SIZE + pattern * LAYOUT.PATTERN_SIDE + LAYOUT.BLOCK_OFFSET
      : block * LAYOUT.BLOCK_SIZE + (pattern + 1) * LAYOUT.PATTERN_SIDE + LAYOUT.BLOCK_OFFSET;
  }

  const { block, type } = blocks.reduce(reduceBlocks, { type: COLLISIONS.TYPE.PASS });

  switch (type) {
    case COLLISIONS.TYPE.PASS: {
      return newPosition;
    }

    case COLLISIONS.TYPE.DETOUR: {
      const { blockCell, blockRow, patternCell, patternRow, pointIndex } = block;

      switch (direction) {
        case TANK.DIRECTION.EAST:
        case TANK.DIRECTION.WEST: {
          const y = LAYOUT.MAP_HALF - getBlockCenter({
            block: blockRow,
            pattern: patternRow,
            point: pointIndex,
          });

          return Math.abs(y - newPosition[1]) < LAYOUT.PATTERN_SIDE
            ? [newPosition[0], y]
            : position;
        }

        case TANK.DIRECTION.NORTH:
        case TANK.DIRECTION.SOUTH: {
          const x = getBlockCenter({
            block: blockCell,
            pattern: patternCell,
            point: pointIndex,
          }) - LAYOUT.MAP_HALF;

          return Math.abs(x - newPosition[0]) < LAYOUT.PATTERN_SIDE
            ? [x, newPosition[1]]
            : position;
        }

        default: {
          return position;
        }
      }
    }

    default: {
      return position;
    }
  }
}

export function canFire({ id, projectiles, projectilesNumber }) {
  function reduceProjectiles(result, projectile) {
    return projectile.parent === id
      ? result + 1
      : result;
  }

  return projectiles.reduce(reduceProjectiles, 0) < projectilesNumber;
}
