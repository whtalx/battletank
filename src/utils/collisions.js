import COLLISIONS from '../constants/collisions';
import OBJECTS from '../constants/objects';
import LAYOUT from '../constants/layout';
import TANK from '../constants/tank';

export function getCollisionBlocks({ direction, map, position, points }) {
  const [x, y] = position;

  function getPoint(shift, pointIndex) {
    const [straight, perpendicular] = shift;

    switch (direction) {
      case TANK.DIRECTION.EAST: {
        return [
          Math.max(0, x + perpendicular + LAYOUT.MAP_HALF - 1),
          LAYOUT.MAP_SIZE - (y - straight + LAYOUT.MAP_HALF) - pointIndex,
        ];
      }

      case TANK.DIRECTION.NORTH: {
        return [
          x + straight + LAYOUT.MAP_HALF - pointIndex,
          LAYOUT.MAP_SIZE - (y + LAYOUT.MAP_HALF) - perpendicular,
        ];
      }

      case TANK.DIRECTION.SOUTH: {
        return [
          x + straight + LAYOUT.MAP_HALF - pointIndex,
          Math.max(0, LAYOUT.MAP_SIZE - (y + LAYOUT.MAP_HALF) + perpendicular - 1),
        ];
      }

      case TANK.DIRECTION.WEST: {
        return [
          x - perpendicular + LAYOUT.MAP_HALF,
          LAYOUT.MAP_SIZE - (y - straight + LAYOUT.MAP_HALF) - pointIndex,
        ];
      }

      default: {
        return position;
      }
    }
  }

  function mapPoints(item, pointIndex) {
    const point = getPoint(item, pointIndex);

    function getIndexes(coord) {
      const part = (coord * LAYOUT.MAP_BLOCKS) / LAYOUT.MAP_SIZE;
      const blockIndex = Math.floor(part);
      const patternIndex = Math.floor((part - blockIndex) * LAYOUT.PATTERN_SIDE);
      return { blockIndex, patternIndex };
    }

    const { blockIndex: blockRow, patternIndex: patternRow } = getIndexes(point[1]);
    const { blockIndex: blockCell, patternIndex: patternCell } = getIndexes(point[0]);

    if (blockRow > map.length || blockCell > map[0].length) return {};

    const { pattern, type } = map[blockRow][blockCell];

    return {
      blockCell,
      blockRow,
      pattern,
      patternCell,
      patternRow,
      pointIndex,
      type: OBJECTS.BLOCK_TYPE_ORDER[type],
    };
  }

  return points.map(mapPoints);
}

export function getPatternCollisionType({ block, direction, spectrum }) {
  const { pattern, patternCell, patternRow, pointIndex } = block;

  function filterFirst(item, index) {
    const modulus = index % LAYOUT.PATTERN_SIDE;

    switch (direction) {
      case TANK.DIRECTION.EAST:
      case TANK.DIRECTION.WEST: {
        return modulus <= patternCell;
      }

      case TANK.DIRECTION.NORTH:
      case TANK.DIRECTION.SOUTH: {
        return (
          modulus <= patternCell && (
            (!modulus && !Math.max(0, patternCell - spectrum)) ||
            (modulus > Math.max(0, patternCell - spectrum))
          )
        );
      }

      default: {
        return false;
      }
    }
  }

  function filterLast(item, index) {
    const modulus = index % LAYOUT.PATTERN_SIDE;

    switch (direction) {
      case TANK.DIRECTION.EAST:
      case TANK.DIRECTION.WEST: {
        return modulus >= patternCell;
      }

      case TANK.DIRECTION.NORTH:
      case TANK.DIRECTION.SOUTH: {
        return (
          modulus >= patternCell &&
          modulus < Math.min(LAYOUT.PATTERN_SIDE, patternCell + spectrum)
        );
      }

      default: {
        return false;
      }
    }
  }

  function summarise(result, value) {
    return Math.min(result + value, COLLISIONS.TYPE.COLLIDE);
  }

  function getValuesBefore() {
    switch (direction) {
      case TANK.DIRECTION.EAST:
      case TANK.DIRECTION.WEST: {
        return pattern.slice(
          Math.max(0, patternRow - spectrum) * LAYOUT.PATTERN_SIDE,
          (patternRow + 1) * LAYOUT.PATTERN_SIDE,
        );
      }

      case TANK.DIRECTION.NORTH:
      case TANK.DIRECTION.SOUTH: {
        return pattern.slice(0, (patternRow + 1) * LAYOUT.PATTERN_SIDE);
      }

      default: {
        return [];
      }
    }
  }

  function getValuesAfter() {
    switch (direction) {
      case TANK.DIRECTION.EAST:
      case TANK.DIRECTION.WEST: {
        return pattern.slice(
          patternRow * LAYOUT.PATTERN_SIDE,
          Math.min(LAYOUT.PATTERN_TOTAL, (patternRow + spectrum) * LAYOUT.PATTERN_SIDE),
        );
      }

      case TANK.DIRECTION.NORTH:
      case TANK.DIRECTION.SOUTH: {
        return pattern.slice(patternRow * LAYOUT.PATTERN_SIDE);
      }

      default: {
        return [];
      }
    }
  }

  function getPattern() {
    switch (direction) {
      case TANK.DIRECTION.EAST: {
        return pointIndex
          ? getValuesBefore().filter(filterFirst)
          : getValuesAfter().filter(filterFirst);
      }

      case TANK.DIRECTION.NORTH: {
        return pointIndex
          ? getValuesAfter().filter(filterFirst)
          : getValuesAfter().filter(filterLast);
      }

      case TANK.DIRECTION.SOUTH: {
        return pointIndex
          ? getValuesBefore().filter(filterFirst)
          : getValuesBefore().filter(filterLast);
      }

      case TANK.DIRECTION.WEST: {
        return pointIndex
          ? getValuesBefore().filter(filterLast)
          : getValuesAfter().filter(filterLast);
      }

      default: {
        return [];
      }
    }
  }

  return getPattern().reduce(summarise, COLLISIONS.TYPE.PASS);
}
