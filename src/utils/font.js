import { Path, Shape } from 'three';

import { FONT } from '../data';

const cache = {};

function renderCharacter(shape, vertices, index) {
  function renderVertices(path) {
    let line = false;

    vertices.forEach(function addVertex(vertex) {
      if (!vertex.length) {
        line = false;
      } else if (line) {
        path.lineTo(...vertex);
      } else {
        path.moveTo(...vertex);
        line = true;
      }
    });

    return path;
  }

  if (index) {
    shape.holes.push(renderVertices(new Path()));
    return shape;
  } else {
    return renderVertices(shape);
  }
}

export function getCharacterShape(character) {
  if (!FONT.hasOwnProperty(character)) return null;

  if (!cache.hasOwnProperty(character)) {
    cache[character] = FONT[character].reduce(renderCharacter, new Shape());
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

export function getCharacterScale({ characterSize: [width, height], fontSize, unit }) {
  return [
    ((fontSize * width / height) / width) * unit,
    (fontSize / height) * unit,
    0,
  ];
}
