import React, { createContext, useMemo } from 'react';
import { useThree } from '@react-three/fiber';

import { LAYOUT } from '../constants';

export const Context = createContext();

Context.displayName = 'LayoutContext';

function getDimensions({ width, height }) {
  const dimensions = {};
  const aspect = width / height;
  dimensions.layout = aspect > 1 ? LAYOUT.HORIZONTAL : LAYOUT.VERTICAL;

  if (aspect > 1) {
    dimensions.width = height * LAYOUT.WIDTH / LAYOUT.HEIGHT;
    dimensions.height = height;
    dimensions.unit = height / LAYOUT.HEIGHT;
  } else {
    dimensions.width = width;
    dimensions.height = width * LAYOUT.HEIGHT / LAYOUT.WIDTH;
    dimensions.unit = width / LAYOUT.WIDTH;
  }

  dimensions.map = {
    position: [
      -LAYOUT.MAP_OFFSET * dimensions.unit,
      0,
      0,
    ],
    size: LAYOUT.MAP_SIZE * dimensions.unit,
  };

  dimensions.block = {
    position: [
      0,
      -LAYOUT.BLOCK_OFFSET * dimensions.unit + dimensions.map.size / 2,
      0,
    ],
    size: LAYOUT.BLOCK_SIZE * dimensions.unit,
  };

  dimensions.block.position[0] = -dimensions.block.position[1] + dimensions.map.position[0];

  return dimensions;
}

export function Provider({ children }) {
  const size = useThree(function getSize(state) {
    return state.size;
  });

  const contextValue = useMemo(
    function memoize() {
      return getDimensions(size);
    },
    [size],
  );

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
}
