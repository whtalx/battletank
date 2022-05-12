import React, { createContext, useMemo } from 'react';
import { useThree } from '@react-three/fiber';

import { LAYOUT } from '../constants';

export const Context = createContext();

Context.displayName = 'LayoutContext';

function getViewDimensions({ width, height }) {
  return {
    view: {
      width,
      height,
      layout: width / height > 1
        ? LAYOUT.HORIZONTAL
        : LAYOUT.VERTICAL,
    },
  };
}

function setScreenDimensions(dimensions) {
  switch (dimensions.view.layout) {
    case LAYOUT.HORIZONTAL: {
      dimensions.screen = {
        width: dimensions.view.height * LAYOUT.WIDTH / LAYOUT.HEIGHT,
        height: dimensions.view.height,
        unit: dimensions.view.height / LAYOUT.HEIGHT,
      };

      break;
    }

    case LAYOUT.VERTICAL: {
      dimensions.screen = {
        width: dimensions.view.width,
        height: dimensions.view.width * LAYOUT.HEIGHT / LAYOUT.WIDTH,
        unit: dimensions.view.width / LAYOUT.WIDTH,
      };

      break;
    }

    default: {
      dimensions.screen = {};
      break;
    }
  }

  return dimensions;
}

function setMapDimensions(dimensions) {
  dimensions.map = {
    position: [
      -LAYOUT.MAP_OFFSET * dimensions.screen.unit,
      0,
      0,
    ],
    size: LAYOUT.MAP_SIZE * dimensions.screen.unit,
  };

  return dimensions;
}

function setBlockDimensions(dimensions) {
  const y = -LAYOUT.BLOCK_OFFSET * dimensions.screen.unit + dimensions.map.size / 2;
  const x = -y + dimensions.map.position[0];

  dimensions.block = {
    position: [x, y, 0],
    size: LAYOUT.BLOCK_SIZE * dimensions.screen.unit,
  };

  return dimensions;
}

export function Provider({ children }) {
  const { width, height } = useThree(function getSize(state) {
    return state.size;
  });

  const contextValue = useMemo(
    function factory() {
      return setBlockDimensions(
        setMapDimensions(
          setScreenDimensions(
            getViewDimensions({ width, height }),
          ),
        ),
      );
    },
    [width, height],
  );

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
}
