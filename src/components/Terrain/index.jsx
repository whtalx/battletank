import React, { memo, useContext, useRef } from 'react';

import Brick from './Brick';
import Base from './Base';
import Ice from './Ice';
import Steel from './Steel';
import Tree from './Tree';
import Water from './Water';

import { useShader, useTexture, useTextureAnimation } from '../../hooks';
import { areEqual } from '../../utils';
import { Layout } from '../../contexts';

import { OBJECTS, SHADER } from '../../constants';

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
  const waterShader = useRef(
    useShader({
      fragment: SHADER.ANIMATED,
      vertex: SHADER.ANIMATED,
      uniforms: {
        u_area: [0.5, 0.5],
        u_map: useTexture(OBJECTS.BLOCK.WATER),
        u_offset: [0, 0],
        u_scale: [0.5, 1],
      },
    }),
  );

  function getPosition(row, cell) {
    return [x + size * cell, y - size * row, z];
  }

  function isBasePosition(row, cell, total) {
    return row === total && cell === total / 2;
  }

  function reduceMap(result, cells, rowIndex) {
    function renderCell({ type, pattern }, cellIndex, row) {
      const props = {
        key: `${rowIndex}^${cellIndex}`,
        position: getPosition(rowIndex, cellIndex),
        size,
      };

      if (isBasePosition(rowIndex, cellIndex, row.length - 1)) {
        return (
          <Base {...props} />
        );
      }

      const Block = BLOCK_ORDER[type];

      switch (Block) {
        case Brick:
        case Steel: {
          props.pattern = pattern;
          break;
        }

        case Water: {
          result.hasWater = result.hasWater || true;
          props.shader = waterShader;
          break;
        }

        default: {
          break;
        }
      }

      return Block && (
        <Block {...props} />
      );
    }

    result.terrain.push(cells.map(renderCell));
    return result;
  }

  const { hasWater, terrain } = map.reduce(reduceMap, { terrain: [] });

  useTextureAnimation({
    callback(offset) {
      waterShader.current.uniforms.u_offset.value[0] = offset;
    },
    duration: 1.25,
    enabled: hasWater,
    offset: 0.5,
  });

  return terrain;
}

export default memo(Terrain, areEqual);
