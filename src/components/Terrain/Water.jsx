import React, { memo } from 'react';

import { areEqual } from '../../utils';

function Water({ position, shader, size }) {
  return (
    <mesh position={position}>
      <planeBufferGeometry args={[size, size, 1]} />
      <shaderMaterial args={[shader.current]} />
    </mesh>
  );
}

export default memo(Water, areEqual);
