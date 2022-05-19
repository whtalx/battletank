import React, { memo, useEffect, useRef } from 'react';

import { useShader, useTexture } from '../../hooks';
import { areEqual } from '../../utils';

import { OBJECTS, SHADER } from '../../constants';

function Steel({ pattern, position, size }) {
  const shader = useRef(
    useShader({
      fragment: SHADER.DESTRUCTIBLE,
      uniforms: {
        u_area: [0.5, 0.5],
        u_map: useTexture(OBJECTS.BLOCK.STEEL),
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
      <planeBufferGeometry args={[size, size, 1]} />
      <shaderMaterial args={[shader.current]} />
    </mesh>
  );
}

export default memo(Steel, areEqual);
