import React, { memo } from 'react';

import { areEqual } from '../../utils/iterable';

import { useTexture } from '../../hooks/useTexture';
import { useShader } from '../../hooks/useShader';

import OBJECTS from '../../constants/objects';

function Ice({ position, size }) {
  const uniforms = { u_area: [0.5, 0.5], u_map: useTexture(OBJECTS.BLOCK.ICE) };
  const shader = useShader({ uniforms });

  return (
    <mesh position={position}>
      <planeBufferGeometry args={[size, size]} />
      <shaderMaterial args={[shader]} />
    </mesh>
  );
}

export default memo(Ice, areEqual);
