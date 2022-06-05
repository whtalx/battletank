import React, { memo } from 'react';

import { areEqual } from '../../utils';

function Water({ position, shader, size }) {
  return (
    <mesh position={position}>
      <planeBufferGeometry args={[size, size]} />
      <shaderMaterial args={[shader.current]} />
    </mesh>
  );
}

export default memo(Water, areEqual);
