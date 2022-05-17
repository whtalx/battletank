import React, { useContext } from 'react';

import { Layout } from '../../contexts';
import Brick from './Brick';
import Base from './Base';
import Steel from './Steel';
import Tree from './Tree';
import Water from './Water';

import { PATTERNS } from '../../data';

export const BLOCK_TYPE = [
  null,
  Brick,
  Steel,
  Tree,
  null,
  Water,
];

export default function Terrain({ levelMap }) {
  const { block: { position: [x, y, z], size } } = useContext(Layout.Context);

  function getPosition(row, cell) {
    return [x + size * cell, y - size * row, z];
  }

  function isBasePosition(row, cell, total) {
    return row === total && cell === total / 2;
  }

  function renderRow(cells, rowIndex) {
    function renderCell({ type, pattern = 0 }, cellIndex, map) {
      const key = `${rowIndex}^${cellIndex}`;
      const position = getPosition(rowIndex, cellIndex);

      if (isBasePosition(rowIndex, cellIndex, map.length - 1)) {
        return (
          <Base key={key} position={position} size={size} />
        );
      }

      const Block = BLOCK_TYPE[type];

      return Block && (
        <Block key={key} pattern={PATTERNS[pattern]} position={position} size={size} />
      );
    }

    return cells.map(renderCell);
  }

  return levelMap.map(renderRow);
}
