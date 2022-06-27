import React, { useContext, useMemo, useRef } from 'react';

import { Layout } from '../../contexts/layout';

import { useAnimation } from '../../hooks/useAnimation';
import { useTexture } from '../../hooks/useTexture';
import { useShader } from '../../hooks/useShader';

import OBJECTS from '../../constants/objects';
import SHADER from '../../constants/shader';

export default function Shield() {
  const { block: { size } } = useContext(Layout);
  const shader = useRef(
    useShader({
      fragment: SHADER.ANIMATED,
      vertex: SHADER.ANIMATED,
      uniforms: {
        u_area: [1, 1],
        u_map: useTexture(OBJECTS.SHIELD),
        u_offset: [0, 0],
        u_scale: [0.5, 1],
      },
    }),
  );

  useAnimation({
    callback(offset) {
      shader.current.uniforms.u_offset.value[0] = offset;
    },
    duration: 0.1,
    offset: 0.5,
  });

  const geometryArgs = useMemo(
    function factory() {
      return [size, size];
    },
    [size],
  );

  const materialArgs = useMemo(
    function factory() {
      return [shader.current];
    },
    [],
  );

  return (
    <mesh>
      <planeBufferGeometry args={geometryArgs} />
      <shaderMaterial args={materialArgs} />
    </mesh>
  );
}
