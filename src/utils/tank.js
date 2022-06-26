import COLLISIONS from '../constants/collisions';
import OBJECTS from '../constants/objects';
import LAYOUT from '../constants/layout';
import TANK from '../constants/tank';

import { getPatternCollisionType } from './collisions';

export function getPlayerTankPosition({ direction, blocks, newPosition, position }) {
  function reduceBlocks(result, block) {
    switch (block.type) {
      case OBJECTS.BLOCK.BASE:
      case OBJECTS.BLOCK.BRICK:
      case OBJECTS.BLOCK.STEEL:
      case OBJECTS.BLOCK.WATER: {
        switch (getPatternCollisionType({ direction, block })) {
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
      ? (block - 1) * LAYOUT.BLOCK_SIZE + pattern * LAYOUT.BLOCK_PATTERN + LAYOUT.BLOCK_OFFSET
      : block * LAYOUT.BLOCK_SIZE + (pattern + 1) * LAYOUT.BLOCK_PATTERN + LAYOUT.BLOCK_OFFSET;
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
          const blockCenter = getBlockCenter({
            block: blockRow,
            pattern: patternRow,
            point: pointIndex,
          });

          const y = LAYOUT.MAP_HALF - blockCenter;

          return Math.abs(y - newPosition[1] < LAYOUT.BLOCK_PATTERN)
            ? [newPosition[0], y]
            : position;
        }

        case TANK.DIRECTION.NORTH:
        case TANK.DIRECTION.SOUTH: {
          const blockCenter = getBlockCenter({
            block: blockCell,
            pattern: patternCell,
            point: pointIndex,
          });

          const x = blockCenter - LAYOUT.MAP_HALF;

          return Math.abs(x - newPosition[0] < LAYOUT.BLOCK_PATTERN)
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
