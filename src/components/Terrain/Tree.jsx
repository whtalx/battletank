import React from 'react';

import { useTexture } from '../../hooks';

import { OBJECTS } from '../../constants';

export default function Tree({ position, size }) {
  const texture = useTexture(OBJECTS.BLOCK.TREE);
  const [x, y] = position;
  return (
    <mesh position={[x, y, 3]}>
      <planeBufferGeometry args={[size, size, 1]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}
