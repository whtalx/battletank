import React, { memo, useContext, useMemo, useRef } from 'react';

import { Layout } from '../../contexts/layout';

import { useTexture } from '../../hooks/useTexture';
import { useShader } from '../../hooks/useShader';

import { areEqual } from '../../utils/iterable';

import PROJECTILE from '../../constants/projectile';
import OBJECTS from '../../constants/objects';
import SHADER from '../../constants/shader';
import LAYOUT from '../../constants/layout';
import TANK from '../../constants/tank';

function Projectile({ direction, position: [positionX, positionY] }) {
  const { map: { position: [mapX, mapY] }, screen: { unit } } = useContext(Layout);
  const shader = useRef(
    useShader({
      vertex: SHADER.TRANSFORM,
      uniforms: {
        u_area: [1, 1],
        u_map: useTexture(OBJECTS.PROJECTILE),
        u_rotation: TANK.ROTATION[direction],
        u_transform: TANK.TRANSFORM[direction],
      },
    }),
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
      const size = PROJECTILE.SIZE * unit;
      return [size, size];
    },
    [unit],
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

export default memo(Projectile, areEqual);
