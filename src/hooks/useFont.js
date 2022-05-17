import { Shape } from 'three';
import { generateUUID } from 'three/src/math/MathUtils';

import { FONT } from '../data';

const cache = {};

function makeShape(path) {
  function makeCurve(curves, points, index) {
    return index
      ? [
        ...curves,
        {
          arcLengthDivisions: 200,
          type: 'LineCurve',
          v1: path[index - 1],
          v2: points,
        },
      ]
      : curves;
  }

  return {
    arcLengthDivisions: 200,
    type: 'Shape',
    autoClose: false,
    currentPoint: [0, 0],
    curves: path.reduce(makeCurve, []),
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

export default function useFont(character) {
  if (!FONT.hasOwnProperty(character)) return null;

  if (!cache.hasOwnProperty(character)) {
    cache[character] = new Shape().fromJSON(FONT[character].reduce(reducePaths, {}));
  }

  return cache[character];
}
