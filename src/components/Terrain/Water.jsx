import React, { memo, useRef } from 'react';
import { Vector2 } from 'three';

import { useShader, useTexture, useTextureAnimation } from '../../hooks';
import { areEqual } from '../../utils';

import { OBJECTS, SHADER } from '../../constants';

function Water({ position, size }) {
  const shader = useRef(
    useShader({
      fragment: SHADER.ANIMATED,
      vertex: SHADER.ANIMATED,
      uniforms: {
        u_map: useTexture(OBJECTS.BLOCK.WATER),
        u_offset: new Vector2(0, 0),
        u_scale: new Vector2(0.5, 1),
      },
    }),
  );

  useTextureAnimation({
    callback(offset) {
      shader.current.uniforms.u_offset.value.setX(offset);
    },
    duration: 1.25,
    offset: 0.5,
  });

  return (
    <mesh position={position}>
      <planeBufferGeometry args={[size, size, 1]} />
      <shaderMaterial args={[shader.current]} />
    </mesh>
  );
}

export default memo(Water, areEqual);
