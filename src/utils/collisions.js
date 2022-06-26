import COLLISIONS from '../constants/collisions';
import OBJECTS from '../constants/objects';
import LAYOUT from '../constants/layout';
import TANK from '../constants/tank';

export function getCollisionBlocks({ direction, map, position, shifts }) {
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

  function mapShifts(shift, pointIndex) {
    const point = getPoint(shift, pointIndex);

    function getIndexes(coord) {
      const part = (coord * 13) / 208;
      const blockIndex = Math.floor(part);
      const patternIndex = Math.floor((part - blockIndex) * LAYOUT.BLOCK_PATTERN);
      return { blockIndex, patternIndex };
    }

    const { blockIndex: blockRow, patternIndex: patternRow } = getIndexes(point[1], 1);
    const { blockIndex: blockCell, patternIndex: patternCell } = getIndexes(point[0], 0);

    if (blockRow > 12 || blockCell > 12) return {};

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

  return shifts.map(mapShifts);
}

export function getPatternCollisionType({ block, direction }) {
  const { patternCell } = block;

  function filterLast(item, index) {
    return (index % LAYOUT.BLOCK_PATTERN) >= patternCell;
  }

  function filterFirst(item, index) {
    return (index % LAYOUT.BLOCK_PATTERN) <= patternCell;
  }

  function summarise(result, value) {
    return result + value;
  }

  function getPattern() {
    const { pattern, patternRow, pointIndex } = block;

    switch (direction) {
      case TANK.DIRECTION.EAST: {
        return pointIndex
          ? pattern.slice(0, (patternRow + 1) * LAYOUT.BLOCK_PATTERN).filter(filterFirst)
          : pattern.slice(patternRow * LAYOUT.BLOCK_PATTERN).filter(filterFirst);
      }

      case TANK.DIRECTION.NORTH: {
        return pointIndex
          ? pattern.slice(patternRow * LAYOUT.BLOCK_PATTERN).filter(filterFirst)
          : pattern.slice(patternRow * LAYOUT.BLOCK_PATTERN).filter(filterLast);
      }

      case TANK.DIRECTION.SOUTH: {
        return pointIndex
          ? pattern.slice(0, (patternRow + 1) * LAYOUT.BLOCK_PATTERN).filter(filterFirst)
          : pattern.slice(0, (patternRow + 1) * LAYOUT.BLOCK_PATTERN).filter(filterLast);
      }

      case TANK.DIRECTION.WEST: {
        return pointIndex
          ? pattern.slice(0, (patternRow + 1) * LAYOUT.BLOCK_PATTERN).filter(filterLast)
          : pattern.slice(patternRow * LAYOUT.BLOCK_PATTERN).filter(filterLast);
      }

      default: {
        return [];
      }
    }
  }

  return getPattern().reduce(summarise, COLLISIONS.TYPE.PASS);
}
