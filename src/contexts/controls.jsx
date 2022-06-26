import React, { createContext, useCallback, useEffect, useMemo, useRef } from 'react';

import { useStore } from '../hooks/useStore';

import { forEach, reduce } from '../utils/iterable';

import SETTINGS from '../constants/settings';
import EVENTS from '../constants/events';

export const Controls = createContext();

Controls.displayName = 'ControlsContext';

function selector({ controls, settings: { keyBindings } }) {
  function reduceBindings(result, value, key) {
    result.bindings[key] = Array.isArray(value)
      ? new Set(value)
      : new Set([value]);

    return result;
  }

  return reduce(keyBindings, { bindings: {}, controls }, reduceBindings);
}

function getInitialListeners() {
  function reduceKeys(result, key) {
    result[key] = { [EVENTS.DOWN]: new Set(), [EVENTS.UP]: new Set() };
    return result;
  }

  return reduce(SETTINGS.KEYS, {}, reduceKeys);
}

function getLastPressed({ key, keyPressed }) {
  function reduceKeys(result, times, keyName) {
    function getLatest(latest, time, code) {
      return latest && times[latest] > time ? latest : code;
    }

    switch (keyName) {
      case SETTINGS.KEYS.DOWN:
      case SETTINGS.KEYS.LEFT:
      case SETTINGS.KEYS.RIGHT:
      case SETTINGS.KEYS.UP: {
        const latest = reduce(times, undefined, getLatest);

        if (!result.key || result.time < times[latest]) {
          result.key = keyName;
          result.time = times[latest];
        }

        return result;
      }

      default: {
        return result;
      }
    }
  }

  switch (key) {
    case SETTINGS.KEYS.DOWN:
    case SETTINGS.KEYS.LEFT:
    case SETTINGS.KEYS.RIGHT:
    case SETTINGS.KEYS.UP: {
      return reduce(keyPressed, {}, reduceKeys).key;
    }

    default: {
      return undefined;
    }
  }
}

Controls.Wrapper = function Wrapper({ children }) {
  const { bindings } = useStore(selector);
  const keyPressed = useRef({});
  const listeners = useRef(getInitialListeners());

  function fireEvents({ event, key, type }) {
    function fire(listener) {
      listener(event);
    }

    forEach(listeners.current[key][type], fire);
  }

  const down = useCallback(
    function onDown({ event, key, keyCode }) {
      if (key && !keyPressed.current[key]?.hasOwnProperty(keyCode)) {
        const alreadyPressed = !!Object.values(keyPressed.current[key] || {}).length;

        keyPressed.current[key] = {
          ...keyPressed.current[key],
          [keyCode]: Date.now(),
        };

        if (!alreadyPressed) fireEvents({ event, key, type: EVENTS.DOWN });
      }
    },
    [],
  );

  const up = useCallback(
    function onUp({ event, key, keyCode }) {
      if (key && keyPressed.current[key]?.hasOwnProperty(keyCode)) {
        const { [keyCode]: time, ...rest } = keyPressed.current[key];

        if (Object.values(rest).length) {
          keyPressed.current[key] = rest;
        } else {
          delete keyPressed.current[key];

          const lastPressed = getLastPressed({ key, keyPressed: keyPressed.current });

          if (lastPressed) {
            fireEvents({ event, key: lastPressed, type: EVENTS.DOWN });
          } else {
            fireEvents({ event, key, type: EVENTS.UP });
          }
        }
      }
    },
    [],
  );

  useEffect(
    function effect() {
      function getKeyByCode(keyCode) {
        function reduceKeyBindings(result, codes, key) {
          return result || (codes.has(keyCode) ? key : result);
        }

        return reduce(bindings, undefined, reduceKeyBindings);
      }

      function onKeyDown(event) {
        const { keyCode, metaKey } = event;

        if (metaKey) return;

        down({ event, key: getKeyByCode(keyCode), keyCode });
      }

      function onKeyUp(event) {
        const { keyCode, metaKey } = event;

        if (metaKey) return;

        up({ event, key: getKeyByCode(keyCode), keyCode });
      }

      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('keyup', onKeyUp);

      return function cleanUp() {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
      };
    },
    [bindings, down, up],
  );

  const contextValue = useMemo(
    function factory() {
      return {
        [EVENTS.DOWN]: down,
        [EVENTS.UP]: up,
        on: {
          [EVENTS.DOWN](key, listener) {
            listeners.current[key][EVENTS.DOWN].add(listener);
          },
          [EVENTS.UP](key, listener) {
            listeners.current[key][EVENTS.UP].add(listener);
          },
        },
        off: {
          [EVENTS.DOWN](key, listener) {
            listeners.current[key][EVENTS.DOWN].delete(listener);
          },
          [EVENTS.UP](key, listener) {
            listeners.current[key][EVENTS.UP].delete(listener);
          },
        },
      };
    },
    [down, up],
  );

  return (
    <Controls.Provider value={contextValue}>
      {children}
    </Controls.Provider>
  );
};
