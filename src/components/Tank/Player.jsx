import React, { memo, useContext, useEffect, useMemo, useRef } from 'react';

import Shield from './Shield';

import { Layout } from '../../contexts/layout';

import { useTexture } from '../../hooks/useTexture';
import { useShader } from '../../hooks/useShader';

import { areEqual } from '../../utils/iterable';

import LAYOUT from '../../constants/layout';
import TANK from '../../constants/tank';
import PLAYER from '../../constants/player';
import SHADER from '../../constants/shader';

function Player({ direction, index, position: [positionX, positionY], shield, type }) {
  const { block: { size }, map: { position: [mapX, mapY] }, screen: { unit } } = useContext(Layout);
  const shader = useRef(
    useShader({
      fragment: SHADER.ANIMATED_COLOR_MAP,
      vertex: SHADER.ANIMATED_TRANSFORM,
      uniforms: {
        u_area: [1, 1],
        u_color: PLAYER.COLORS_ORDER[index],
        u_map: useTexture(type),
        u_offset: [0, 0],
        u_scale: [0.5, 1],
        u_rotation: TANK.ROTATION[direction],
        u_transform: TANK.TRANSFORM[direction],
      },
    }),
  );

  useEffect(
    function effect() {
      shader.current.uniforms.u_rotation.value = TANK.ROTATION[direction];
      shader.current.uniforms.u_transform.value = TANK.TRANSFORM[direction];
    },
    [direction],
  );

  useEffect(
    function effect() {
      shader.current.uniforms.u_offset.value[0] = shader.current.uniforms.u_offset.value[0]
        ? 0
        : shader.current.uniforms.u_scale.value[0];
    },
    [positionX, positionY],
  );

  const meshPosition = useMemo(
    function factory() {
      return [
        positionX * unit + mapX,
        positionY * unit + mapY,
        LAYOUT.Z_INDEX.TANK,
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
      {shield && <Shield />}
    </mesh>
  );
}

export default memo(Player, areEqual);
