import React, { useContext } from 'react';
import Text from '../Text';

import { Layout } from '../../contexts';

import { COLORS } from '../../data';

export default function Curtain({ stringStage }) {
  const { screen, view } = useContext(Layout.Context);
  return (
    <>
      <mesh>
        <planeBufferGeometry args={[view.width, view.height]} />
        <meshBasicMaterial color={COLORS['00']} />
      </mesh>
      <Text
        color={COLORS['0D']}
        text={`STAGE ${stringStage}`}
        unit={screen.unit}
      />
    </>
  );
}
