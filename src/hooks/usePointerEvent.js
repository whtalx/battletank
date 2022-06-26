import { useRef } from 'react';

import { void0 } from '../utils/void0';

const TYPE = {
  OVER: 'over',
  OFF: 'off',
};

export function usePointerEvent({
  onDown = void0,
  onEnter = void0,
  onLeave = void0,
  onMove = void0,
  onUp = void0,
}) {
  const touches = useRef({});

  return {
    onPointerDown(event) {
      if (touches.current.hasOwnProperty(event.pointerId)) return;

      touches.current[event.pointerId] = TYPE.OVER;
      onDown(event);
    },
    onPointerEnter(event) {
      if (touches.current[event.pointerId] !== TYPE.OFF) return;

      touches.current[event.pointerId] = TYPE.OVER;
      onEnter(event);
    },
    onPointerLeave(event) {
      if (touches.current[event.pointerId] !== TYPE.OVER) return;

      touches.current[event.pointerId] = TYPE.OFF;
      onLeave(event);
    },
    onPointerMove(event) {
      if (touches.current[event.pointerId] !== TYPE.OVER) return;

      onMove(event);
    },
    onPointerUp(event) {
      if (!touches.current.hasOwnProperty(event.pointerId)) return;

      delete touches.current[event.pointerId];
      onUp(event);
    },
  };
}
