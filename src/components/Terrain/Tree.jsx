import React, { memo } from 'react';

import { areEqual } from '../../utils/iterable';

import { useTexture } from '../../hooks/useTexture';
import { useShader } from '../../hooks/useShader';

import OBJECTS from '../../constants/objects';
import LAYOUT from '../../constants/layout';

function Tree({ position, size }) {
  const uniforms = { u_area: [0.5, 0.5], u_map: useTexture(OBJECTS.BLOCK.TREE) };
  const shader = useShader({ uniforms });
  const [x, y] = position;

  return (
    <mesh position={[x, y, LAYOUT.Z_INDEX.TREE]}>
      <planeBufferGeometry args={[size, size]} />
      <shaderMaterial args={[shader]} />
    </mesh>
  );
}

export default memo(Tree, areEqual);
