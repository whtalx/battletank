import React from 'react';

import { useShader, useTexture } from '../../hooks';

import { OBJECTS } from '../../constants';

export default function Steel({ pattern, position, size }) {
  const uniforms = { u_map: useTexture(OBJECTS.BLOCK.STEEL), u_pattern: pattern };
  const shader = useShader({ type: OBJECTS.BLOCK.STEEL, uniforms });

  return (
    <mesh position={position}>
      <planeBufferGeometry args={[size, size, 1]} />
      <shaderMaterial args={[shader]} />
    </mesh>
  );
}
