import React, { memo, useContext } from 'react';

import { Layout } from '../../contexts';
import Brick from './Brick';
import Base from './Base';
import Ice from './Ice';
import Steel from './Steel';
import Tree from './Tree';
import Water from './Water';

import { areEqual } from '../../utils';

const BLOCK_ORDER = [
  null,
  Brick,
  Steel,
  Tree,
  Ice,
  Water,
];

function Terrain({ map }) {
  const { block: { position: [x, y, z], size } } = useContext(Layout.Context);

  function getPosition(row, cell) {
    return [x + size * cell, y - size * row, z];
  }

  function isBasePosition(row, cell, total) {
    return row === total && cell === total / 2;
  }

  function renderRow(cells, rowIndex) {
    function renderCell({ type, pattern }, cellIndex, row) {
      const key = `${rowIndex}^${cellIndex}`;
      const position = getPosition(rowIndex, cellIndex);

      if (isBasePosition(rowIndex, cellIndex, row.length - 1)) {
        return (
          <Base key={key} position={position} size={size} />
        );
      }

      const Block = BLOCK_ORDER[type];

      return Block && (
        <Block key={key} pattern={pattern} position={position} size={size} />
      );
    }

    return cells.map(renderCell);
  }

  return map.map(renderRow);
}

export default memo(Terrain, areEqual);
