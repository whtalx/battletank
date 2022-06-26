import React, { memo, useEffect, useRef } from 'react';

import { areEqual } from '../../utils/iterable';

import { useTexture } from '../../hooks/useTexture';
import { useShader } from '../../hooks/useShader';

import OBJECTS from '../../constants/objects';
import SHADER from '../../constants/shader';

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
