import React, { memo } from 'react';

import { useShader, useTexture } from '../../hooks';
import { areEqual } from '../../utils';

import { OBJECTS } from '../../constants';

function Tree({ position, size }) {
  const uniforms = { u_area: [0.5, 0.5], u_map: useTexture(OBJECTS.BLOCK.TREE) };
  const shader = useShader({ uniforms });
  const [x, y] = position;

  return (
    <mesh position={[x, y, 3]}>
      <planeBufferGeometry args={[size, size, 1]} />
      <shaderMaterial args={[shader]} />
    </mesh>
  );
}

export default memo(Tree, areEqual);
