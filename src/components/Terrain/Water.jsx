import React from 'react';

import { useTexture, useTextureAnimation } from '../../hooks';

import { BLOCK } from '../../constants';

export default function Water({ position, size }) {
  const texture = useTexture(BLOCK.WATER);
  useTextureAnimation({ duration: 1.25, offset: 0.5, texture });

  return (
    <mesh position={position}>
      <planeBufferGeometry args={[size, size, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
