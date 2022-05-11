import React, { useContext } from 'react';

import { Layout } from '../../contexts';

// import { useKeyEvent } from '../../hooks';

import { COLORS } from '../../constants';
// import { KEYS } from '../../constants/settings';

export default function Background() {
  const { width, height, map } = useContext(Layout.Context);

  // useKeyEvent({
  //   key: KEYS.START,
  //   listener(event) {
  //     console.log(event);
  //   },
  // });

  return (
    <>
      <mesh position={[0, 0, 0]}>
        <planeBufferGeometry args={[width, height, 1]} />
        <meshBasicMaterial color={COLORS['00']} />
      </mesh>
      <mesh position={map.position}>
        <planeBufferGeometry args={[map.size, map.size, 1]} />
        <meshBasicMaterial color={COLORS['1D']} />
      </mesh>
    </>
  );
}
