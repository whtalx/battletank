import React, { memo, useEffect, useRef } from 'react';

import { useShader, useTexture } from '../../hooks';
import { useStore } from '../../store';
import { areEqual } from '../../utils';

import { OBJECTS, SHADER } from '../../constants';

function selector({ game: { defeated } }) {
  return {
    defeated,
  };
}

function Base({ position, size }) {
  const { defeated } = useStore(selector);
  const shader = useRef(
    useShader({
      fragment: SHADER.ANIMATED,
      vertex: SHADER.ANIMATED,
      uniforms: {
        u_area: [1, 1],
        u_map: useTexture(OBJECTS.BASE),
        u_offset: [0, 0],
        u_scale: [0.5, 1],
      },
    }),
  );

  useEffect(
    function effect() {
      shader.current.uniforms.u_offset.value[0] = defeated ? 0.5 : 0;
    },
    [defeated],
  );

  return (
    <mesh position={position}>
      <planeBufferGeometry args={[size, size, 1]} />
      <shaderMaterial args={[shader.current]} />
    </mesh>
  );
}

export default memo(Base, areEqual);
