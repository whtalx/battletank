import React, { createContext, useMemo } from 'react';
import { useThree } from '@react-three/fiber';

import { LAYOUT } from '../constants';

export const Context = createContext();

Context.displayName = 'LayoutContext';

function getDimensions({ width, height }) {
  const aspect = width / height;
  const layout = aspect > 1 ? LAYOUT.HORIZONTAL : LAYOUT.VERTICAL;

  if (aspect > 1) {
    return {
      layout,
      width: height * LAYOUT.WIDTH / LAYOUT.HEIGHT,
      height,
      unit: height / LAYOUT.HEIGHT,
    };
  } else {
    return {
      layout,
      width,
      height: width * LAYOUT.HEIGHT / LAYOUT.WIDTH,
      unit: width / LAYOUT.WIDTH,
    };
  }
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
