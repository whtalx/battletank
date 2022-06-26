/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';

import { Controls } from '../contexts/controls';

import EVENTS from '../constants/events';

export function useKeyEvent({ key, listener, type = EVENTS.DOWN }) {
  const { on, off } = useContext(Controls);

  useEffect(
    function effect() {
      on[type](key, listener);

      return function cleanUp() {
        off[type](key, listener);
      };
    },
    [key],
  );
}
