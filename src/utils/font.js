import { Shape } from 'three';
import { generateUUID } from 'three/src/math/MathUtils';

import { FONT } from '../data';

const cache = {};

const EMPTY_SHAPE = {
  arcLengthDivisions: 200,
  type: 'Shape',
  autoClose: false,
  currentPoint: [0, 0],
};

const EMPTY_CURVE = {
  arcLengthDivisions: 200,
  type: 'LineCurve',
};

function makeShape(path) {
  function makeCurve(result, points, index) {
    if (points.length && path[index - 1]?.length) {
      result.curves.push({ ...EMPTY_CURVE, v1: path[index - 1], v2: points });
    } else if (points.length) {
      result.currentPoint = points;
    }

    return result;
  }

  return {
    ...EMPTY_SHAPE,
    ...path.reduce(makeCurve, { curves: [] }),
  };
}

function reducePaths(shape, path, index) {
  return index
    ? {
      ...shape,
      holes: [...shape.holes, makeShape(path)],
    }
    : {
      ...makeShape(path),
      holes: [],
      uuid: generateUUID(),
    };
}

export function getFontShape(character) {
  if (!FONT.hasOwnProperty(character)) return null;

  if (!cache.hasOwnProperty(character)) {
    cache[character] = new Shape().fromJSON(FONT[character].reduce(reducePaths, {}));
  }

  return cache[character];
}

export function getCharacterSize(character) {
  switch (character) {
    case '!':
    case '.':
    case ',':
    case ':':
    case ';':
    case '"':
    case '\'': {
      return [8, 16];
    }

    default: {
      return [16, 16];
    }
  }
}
