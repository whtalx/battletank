import React, { useContext, useMemo, useRef } from 'react';

import { Controls, Layout } from '../../contexts';

import { usePointerEvent, useShader, useTexture } from '../../hooks';

import { OVERLAY, SETTINGS, SHADER } from '../../constants';
import { TEXTURES } from '../../data';

const BREAKPOINTS = [0.328125, 0.671875];

export default function DPad() {
  const direction = useRef(null);
  const { screen, view } = useContext(Layout.Context);
  const { up, down } = useContext(Controls.Context);
  const { position, size } = useMemo(
    function factory() {
      const width = TEXTURES[OVERLAY.D_PAD].height * screen.unit;
      const height = TEXTURES[OVERLAY.D_PAD].height * screen.unit;
      return {
        position: [
          (width - view.width) / 2 + 8 * screen.unit,
          (height - view.height) / 2 + 8 * screen.unit,
          11,
        ],
        size: [width, height],
      };
    },
    [screen, view],
  );

  const shader = useRef(
    useShader({
      fragment: SHADER.ANIMATED_PATTERN,
      vertex: SHADER.ANIMATED,
      uniforms: {
        u_area: [1, 1],
        u_map: useTexture(OVERLAY.D_PAD),
        u_offset: [0.5, 0],
        u_scale: [0.5, 1],
        u_pattern: [0, 0, 0, 0],
      },
    }),
  );

  function getDirection({ x, y }) {
    if (x <= BREAKPOINTS[0]) {
      if (y >= BREAKPOINTS[0] && y <= BREAKPOINTS[1]) {
        return SETTINGS.KEYS.LEFT;
      }
    } else if (x >= BREAKPOINTS[1]) {
      if (y >= BREAKPOINTS[0] && y <= BREAKPOINTS[1]) {
        return SETTINGS.KEYS.RIGHT;
      }
    } else if (y <= BREAKPOINTS[0]) {
      return SETTINGS.KEYS.DOWN;
    } else if (y >= BREAKPOINTS[1]) {
      return SETTINGS.KEYS.UP;
    }

    return null;
  }

  function setDirection({ event, key }) {
    if (key !== direction.current) {
      if (direction.current) {
        up({ event, key: direction.current, keyCode: direction.current });
      }

      if (key) {
        down({ event, key, keyCode: key });
      }

      direction.current = key;
    }

    switch (key) {
      case SETTINGS.KEYS.DOWN: {
        shader.current.uniforms.u_pattern.value = [0, 0, 1, 1];
        break;
      }

      case SETTINGS.KEYS.LEFT: {
        shader.current.uniforms.u_pattern.value = [1, 0, 1, 0];
        break;
      }

      case SETTINGS.KEYS.RIGHT: {
        shader.current.uniforms.u_pattern.value = [0, 1, 0, 1];
        break;
      }

      case SETTINGS.KEYS.UP: {
        shader.current.uniforms.u_pattern.value = [1, 1, 0, 0];
        break;
      }

      default: {
        shader.current.uniforms.u_pattern.value = [0, 0, 0, 0];
        break;
      }
    }
  }

  function onDown(event) {
    setDirection({ event, key: getDirection(event.uv) });
  }

  function onUp(event) {
    setDirection({ event, key: null });
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
