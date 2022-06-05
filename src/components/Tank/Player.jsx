import React, { memo, useContext, useRef } from 'react';

import { useShader, useTexture, useTextureAnimation } from '../../hooks';
import { areEqual } from '../../utils';
import { Layout } from '../../contexts';

import { PLAYER, SHADER, Z_INDEX } from '../../constants';

function Player({ index, moving, position, type }) {
  const { block, map, screen } = useContext(Layout.Context);
  const shader = useRef(
    useShader({
      fragment: SHADER.ANIMATED_COLOR_MAP,
      vertex: SHADER.ANIMATED,
      uniforms: {
        u_area: [1, 1],
        u_color: PLAYER.COLORS_ORDER[index],
        u_map: useTexture(type),
        u_offset: [0.5, 0],
        u_scale: [0.5, 1],
      },
    }),
  );

  useTextureAnimation({
    callback(offset) {
      shader.current.uniforms.u_offset.value[0] = offset;
    },
    duration: 0.16,
    enabled: moving,
    offset: 0.5,
  });

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
