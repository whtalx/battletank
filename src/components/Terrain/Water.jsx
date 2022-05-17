import React from 'react';

import { useTextureAnimation, useTexture } from '../../hooks';

import { OBJECTS } from '../../constants';

export default function Water({ position, size }) {
  const texture = useTexture(OBJECTS.BLOCK.WATER);
  useTextureAnimation({ duration: 1.25, offset: 0.5, texture });

  return (
    <mesh position={position}>
      <planeBufferGeometry args={[size, size, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
