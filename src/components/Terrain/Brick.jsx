import React, { memo, useEffect, useRef } from 'react';

import { useShader, useTexture } from '../../hooks';
import { areEqual } from '../../utils';

import { OBJECTS, SHADER } from '../../constants';

function Brick({ pattern, position, size }) {
  const shader = useRef(
    useShader({
      fragment: SHADER.PATTERN,
      uniforms: {
        u_area: [0.5, 0.5],
        u_map: useTexture(OBJECTS.BLOCK.BRICK),
        u_pattern: pattern,
      },
    }),
  );

  useEffect(
    function effect() {
      shader.current.uniforms.u_pattern.value = pattern;
    },
    [pattern],
  );

  return (
    <mesh position={position}>
      <planeBufferGeometry args={[size, size]} />
      <shaderMaterial args={[shader.current]} />
    </mesh>
  );
}

export default memo(Brick, areEqual);
