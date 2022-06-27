import LAYOUT from '../constants/layout';
import TANK from '../constants/tank';

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
