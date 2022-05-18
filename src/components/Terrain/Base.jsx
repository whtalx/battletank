import React, { memo } from 'react';

import { useTexture } from '../../hooks';
import { useStore } from '../../store';
import { areEqual } from '../../utils';

import { OBJECTS } from '../../constants';

function selector({ game: { defeated } }) {
  return {
    name: defeated ? OBJECTS.FLAG : OBJECTS.BLAZON,
  };
}

function Base({ position, size }) {
  const { name } = useStore(selector);
  const texture = useTexture(name);
  return (
    <mesh position={position}>
      <planeBufferGeometry args={[size, size, 1]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

export default memo(Base, areEqual);
