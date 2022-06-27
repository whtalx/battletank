import React, { memo, useContext, useEffect, useMemo, useRef } from 'react';

import { Layout } from '../../contexts/layout';

import { useTexture } from '../../hooks/useTexture';
import { useShader } from '../../hooks/useShader';

import { areEqual } from '../../utils/iterable';

import OBJECTS from '../../constants/objects';
import SHADER from '../../constants/shader';
import LAYOUT from '../../constants/layout';

const ONE_THIRD = 1 / 3;

function Hit({ explosion, position: [positionX, positionY] }) {
  const { block: { size }, map: { position: [mapX, mapY] }, screen: { unit } } = useContext(Layout);
  const shader = useRef(
    useShader({
      fragment: SHADER.ANIMATED,
      vertex: SHADER.ANIMATED,
      uniforms: {
        u_area: [1, 1],
        u_map: useTexture(OBJECTS.HIT),
        u_offset: [0, 0],
        u_scale: [ONE_THIRD, 1],
      },
    }),
  );

  useEffect(
    function effect() {
      shader.current.uniforms.u_offset.value[0] = ONE_THIRD * (explosion - 1);
    },
    [explosion],
  );

  const meshPosition = useMemo(
    function factory() {
      return [
        positionX * unit + mapX,
        positionY * unit + mapY,
        LAYOUT.Z_INDEX.PROJECTILE,
      ];
    },
    [mapX, mapY, positionX, positionY, unit],
  );

  const geometryArgs = useMemo(
    function factory() {
      return [size, size];
    },
    [size],
  );

  const materialArgs = useMemo(
    function factory() {
      return [shader.current];
    },
    [],
  );

  return (
    <mesh position={meshPosition}>
      <planeBufferGeometry args={geometryArgs} />
      <shaderMaterial args={materialArgs} />
    </mesh>
  );
}

export default memo(Hit, areEqual);
