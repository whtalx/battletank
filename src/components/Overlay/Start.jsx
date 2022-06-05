import React, { useContext, useMemo, useRef } from 'react';

import { Controls, Layout } from '../../contexts';

import { usePointerEvent, useShader, useTexture } from '../../hooks';

import { OVERLAY, SETTINGS, SHADER, Z_INDEX } from '../../constants';
import { TEXTURES } from '../../data';

export default function Start() {
  const { screen, view } = useContext(Layout.Context);
  const { up, down } = useContext(Controls.Context);
  const { position, size } = useMemo(
    function factory() {
      const width = TEXTURES[OVERLAY.START].width * screen.unit;
      const height = TEXTURES[OVERLAY.START].height / 2 * screen.unit;
      return {
        position: [
          (view.width - width) / 2 - 8 * screen.unit,
          (height - view.height) / 2 + 56 * screen.unit,
          Z_INDEX.OVERLAY,
        ],
        size: [width, height],
      };
    },
    [screen, view],
  );

  const shader = useRef(
    useShader({
      fragment: SHADER.ANIMATED,
      vertex: SHADER.ANIMATED,
      uniforms: {
        u_area: [1, 1],
        u_map: useTexture(OVERLAY.START),
        u_offset: [0, 0.5],
        u_scale: [1, 0.5],
      },
    }),
  );

  function onDown(event) {
    down({ event, key: SETTINGS.KEYS.START, keyCode: SETTINGS.KEYS.START });
    shader.current.uniforms.u_offset.value[1] = 0;
  }

  function onUp(event) {
    up({ event, key: SETTINGS.KEYS.START, keyCode: SETTINGS.KEYS.START });
    shader.current.uniforms.u_offset.value[1] = 0.5;
  }

  const listeners = usePointerEvent({
    onDown,
    onEnter: onDown,
    onLeave: onUp,
    onMove: onDown,
    onUp,
  });

  return (
    <mesh position={position} {...listeners}>
      <planeBufferGeometry args={size} />
      <shaderMaterial args={[shader.current]} />
    </mesh>
  );
}
