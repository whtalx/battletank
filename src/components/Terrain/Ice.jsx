import React, { memo } from 'react';

import { useShader, useTexture } from '../../hooks';
import { areEqual } from '../../utils';

import { OBJECTS } from '../../constants';

function Ice({ position, size }) {
  const uniforms = { u_map: useTexture(OBJECTS.BLOCK.ICE) };
  const shader = useShader({ uniforms });

  return (
    <mesh position={position}>
      <planeBufferGeometry args={[size, size, 1]} />
      <shaderMaterial args={[shader]} />
    </mesh>
  );
}

export default memo(Ice, areEqual);