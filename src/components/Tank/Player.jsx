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

function Player({ direction, index, position, shield, type }) {
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

  const {
    block: { size },
    map: { position: [mx, my] },
    screen: { unit },
  } = useContext(Layout);

  const [tx, ty] = position;

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
    [tx, ty],
  );

  const meshPosition = useMemo(
    function factory() {
      return [tx * unit + mx, ty * unit + my, LAYOUT.Z_INDEX.TANK];
    },
    [mx, my, tx, ty, unit],
  );

  return (
    <mesh position={meshPosition}>
      <planeBufferGeometry args={[size, size]} />
      <shaderMaterial args={[shader.current]} />
      {shield && <Shield />}
    </mesh>
  );
}

export default memo(Player, areEqual);
