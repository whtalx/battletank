import { getPatternCollisionType } from './collisions';
import { splice } from './iterable';

import PROJECTILE from '../constants/projectile';
import COLLISIONS from '../constants/collisions';
import OBJECTS from '../constants/objects';
import LAYOUT from '../constants/layout';
import GAME from '../constants/game';
import TANK from '../constants/tank';

const spectrum = 1;

export function getStartPosition({ direction, position }) {
  const [x, y] = position;

  switch (direction) {
    case TANK.DIRECTION.EAST: {
      return [
        x + LAYOUT.BLOCK_OFFSET,
        y,
      ];
    }

    case TANK.DIRECTION.NORTH: {
      return [
        x,
        y + LAYOUT.BLOCK_OFFSET,
      ];
    }

    case TANK.DIRECTION.SOUTH: {
      return [
        x,
        y - LAYOUT.BLOCK_OFFSET,
      ];
    }

    case TANK.DIRECTION.WEST: {
      return [
        x - LAYOUT.BLOCK_OFFSET,
        y,
      ];
    }

    default: {
      return position;
    }
  }
}

export function getCollisionEffects({ blocks, direction, power, state }) {
  function damageBlock({ block, patternCell, patternRow, pointIndex }) {
    const pairs = [[patternRow, patternCell]];

    function reducePairs(result, pair) {
      const [row, cell] = pair;
      return splice(result, row * LAYOUT.PATTERN_SIDE + cell, 0);
    }

    switch (direction) {
      case TANK.DIRECTION.NORTH:
      case TANK.DIRECTION.SOUTH: {
        if (pointIndex) {
          if (patternCell === 0 || patternCell === 2) {
            pairs.push([patternRow, patternCell + 1]);
          }
        } else {
          if (patternCell === 1 || patternCell === 3) {
            pairs.push([patternRow, patternCell - 1]);
          }
        }

        break;
      }

      case TANK.DIRECTION.EAST:
      case TANK.DIRECTION.WEST: {
        if (pointIndex) {
          if (patternRow === 0 || patternRow === 2) {
            pairs.push([patternRow + 1, patternCell]);
          }
        } else {
          if (patternRow === 1 || patternRow === 3) {
            pairs.push([patternRow - 1, patternCell]);
          }
        }

        break;
      }

      default: {
        break;
      }
    }

    return { ...block, pattern: pairs.reduce(reducePairs, block.pattern) };
  }

  function reduceBlocks(effects, block) {
    switch (block.type) {
      case OBJECTS.BLOCK.BASE: {
        effects.explosion = true;
        effects.status = GAME.STATUS.COUNT;
        return effects;
      }

      case OBJECTS.BLOCK.BRICK:
      case OBJECTS.BLOCK.STEEL: {
        switch (getPatternCollisionType({ direction, block, spectrum })) {
          case COLLISIONS.TYPE.PASS: {
            return effects;
          }

          default: {
            effects.explosion = true;

            if (power >= PROJECTILE.POWER_NEEDED_TO_DAMAGE[block.type]) {
              const map = effects.map || state.map;
              effects.map = splice(
                map,
                block.blockRow,
                splice(
                  map[block.blockRow],
                  block.blockCell,
                  damageBlock({
                    block: map[block.blockRow][block.blockCell],
                    ...block,
                  }),
                ),
              );
            }

            return effects;
          }
        }
      }

      default: {
        return effects;
      }
    }
  }

  return blocks.reduce(reduceBlocks, {});
}
