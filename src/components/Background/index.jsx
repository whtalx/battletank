import React, { useContext } from 'react';

import { Layout } from '../../contexts';

import { COLORS } from '../../data';

export default function Background() {
  const { map, screen } = useContext(Layout.Context);

  return (
    <>
      <mesh position={[0, 0, 0]}>
        <planeBufferGeometry args={[screen.width, screen.height, 1]} />
        <meshBasicMaterial color={COLORS['00']} />
      </mesh>
      <mesh position={map.position}>
        <planeBufferGeometry args={[map.size, map.size, 1]} />
        <meshBasicMaterial color={COLORS['1D']} />
      </mesh>
    </>
  );
}
