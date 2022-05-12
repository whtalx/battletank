import React from 'react';

import { useShader, useTexture } from '../../hooks';

import { BLOCK } from '../../constants';

export default function Brick({ pattern, position, size }) {
  const uniforms = { u_map: useTexture(BLOCK.BRICK), u_pattern: pattern };
  const shader = useShader({ type: BLOCK.BRICK, uniforms });

  return (
    <mesh position={position}>
      <planeBufferGeometry args={[size, size, 1]} />
      <shaderMaterial args={[shader]} />
    </mesh>
  );
}
