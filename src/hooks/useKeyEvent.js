/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';

import { Controls } from '../contexts';

import { EVENTS } from '../constants';

export default function useKeyEvent({ key, listener, type = EVENTS.DOWN }) {
  const { on, off } = useContext(Controls.Context);

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
