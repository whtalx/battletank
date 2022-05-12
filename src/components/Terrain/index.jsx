import React, { useContext } from 'react';

import { Layout } from '../../contexts';
import Brick from './Brick';
import Steel from './Steel';
import Tree from './Tree';
import Water from './Water';

import { BLOCK } from '../../constants';
import { PATTERNS } from '../../data';

export default function Terrain({ levelMap }) {
  const { block: { position: [x, y, z], size } } = useContext(Layout.Context);

  function getPosition(row, cell) {
    return [x + size * cell, y - size * row, z];
  }

  function renderRow(cells, rowIndex) {
    function renderCell({ type, pattern = 0 }, cellIndex) {
      switch (BLOCK.TYPE[type]) {
        case BLOCK.BRICK: {
          return (
            <Brick
              key={`${rowIndex}-${cellIndex}`}
              pattern={PATTERNS[pattern]}
              position={getPosition(rowIndex, cellIndex)}
              size={size}
            />
          );
        }

        case BLOCK.STEEL: {
          return (
            <Steel
              key={`${rowIndex}-${cellIndex}`}
              pattern={PATTERNS[pattern]}
              position={getPosition(rowIndex, cellIndex)}
              size={size}
            />
          );
        }

        case BLOCK.TREE: {
          return (
            <Tree
              key={`${rowIndex}-${cellIndex}`}
              position={getPosition(rowIndex, cellIndex)}
              size={size}
            />
          );
        }

        case BLOCK.WATER: {
          return (
            <Water
              key={`${rowIndex}-${cellIndex}`}
              position={getPosition(rowIndex, cellIndex)}
              size={size}
            />
          );
        }

        default: {
          return null;
        }
      }
    }

    return cells.map(renderCell);
  }

  return levelMap.map(renderRow);
}
