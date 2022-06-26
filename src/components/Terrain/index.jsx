import React, { memo, useContext, useRef } from 'react';

import Brick from './Brick';
import Base from './Base';
import Ice from './Ice';
import Steel from './Steel';
import Tree from './Tree';
import Water from './Water';

import { Layout } from '../../contexts/layout';

import { useAnimation } from '../../hooks/useAnimation';
import { useTexture } from '../../hooks/useTexture';
import { useShader } from '../../hooks/useShader';

import { areEqual } from '../../utils/iterable';

import OBJECTS from '../../constants/objects';
import SHADER from '../../constants/shader';

const BLOCK_ELEMENT = {
  [OBJECTS.BLOCK.BASE]: Base,
  [OBJECTS.BLOCK.BRICK]: Brick,
  [OBJECTS.BLOCK.ICE]: Ice,
  [OBJECTS.BLOCK.STEEL]: Steel,
  [OBJECTS.BLOCK.TREE]: Tree,
  [OBJECTS.BLOCK.WATER]: Water,
};

function Terrain({ map }) {
  const { block: { position: [x, y, z], size } } = useContext(Layout);
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

  function reduceMap(result, cells, rowIndex) {
    function renderCell({ type, pattern }, cellIndex) {
      const props = {
        key: `${rowIndex}^${cellIndex}`,
        position: getPosition(rowIndex, cellIndex),
        size,
      };

      const Element = BLOCK_ELEMENT[OBJECTS.BLOCK_TYPE_ORDER[type]];

      switch (Element) {
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

      return Element && (
        <Element {...props} />
      );
    }

    result.terrain.push(cells.map(renderCell));
    return result;
  }

  const { hasWater, terrain } = map.reduce(reduceMap, { hasWater: false, terrain: [] });

  useAnimation({
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
