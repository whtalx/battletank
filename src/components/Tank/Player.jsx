import React, { memo, useContext, useEffect, useRef } from 'react';

import { useShader, useTexture } from '../../hooks';
import { areEqual } from '../../utils';
import { Layout } from '../../contexts';

import { PLAYER, SHADER, TANK, Z_INDEX } from '../../constants';

function Player({ direction, index, moving, position, type }) {
  const { block, map, screen } = useContext(Layout.Context);
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
      if (!moving) return;

      shader.current.uniforms.u_offset.value[0] = shader.current.uniforms.u_offset.value[0]
        ? 0
        : shader.current.uniforms.u_scale.value[0];
    },
    [moving, position],
  );

  function mapCoords(x, y) {
    return x * screen.unit + map.position[y];
  }

  return (
    <mesh position={[...position.map(mapCoords), Z_INDEX.TANK]}>
      <planeBufferGeometry args={[block.size, block.size]} />
      <shaderMaterial args={[shader.current]} />
    </mesh>
  );
}

export default memo(Player, areEqual);
