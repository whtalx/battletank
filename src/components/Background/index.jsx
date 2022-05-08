import React, { useContext } from 'react';

import { Layout } from '../../contexts';

// import { useKeyEvent } from '../../hooks';

import { COLORS, LAYOUT } from '../../constants';
// import { KEYS } from '../../constants/settings';

export default function Background() {
  const { unit, width, height } = useContext(Layout.Context);
  const mapOffset = LAYOUT.MAP_OFFSET * unit;
  const mapSize = LAYOUT.MAP_SIZE * unit;

  // useKeyEvent({
  //   key: KEYS.START,
  //   listener(event) {
  //     console.log(event);
  //   },
  // });

  return (
    <>
      <mesh position={[0, 0, 0]}>
        <planeBufferGeometry args={[width, height, 1, 1]} />
        <meshBasicMaterial color={COLORS['00']} />
      </mesh>
      <mesh position={[-mapOffset, 0, 0]}>
        <planeBufferGeometry args={[mapSize, mapSize, 1]} />
        <meshBasicMaterial color={COLORS['1D']} />
      </mesh>
    </>
  );
}
