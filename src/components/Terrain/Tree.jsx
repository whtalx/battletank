import React, { memo } from 'react';

import { useShader, useTexture } from '../../hooks';
import { areEqual } from '../../utils';

import { OBJECTS, Z_INDEX } from '../../constants';

function Tree({ position, size }) {
  const uniforms = { u_area: [0.5, 0.5], u_map: useTexture(OBJECTS.BLOCK.TREE) };
  const shader = useShader({ uniforms });
  const [x, y] = position;

  return (
    <mesh position={[x, y, Z_INDEX.TREE]}>
      <planeBufferGeometry args={[size, size]} />
      <shaderMaterial args={[shader]} />
    </mesh>
  );
}

export default memo(Tree, areEqual);
