import React, { createContext, useCallback, useEffect, useMemo, useRef } from 'react';

import { forEach, reduce } from '../utils/iterable';
import useStore from '../hooks/useStore';

import { DOWN, UP } from '../constants/events';
import { KEYS } from '../constants/settings';

export const Context = createContext();

Context.displayName = 'ControlsContext';

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
    result[key] = { [DOWN]: new Set(), [UP]: new Set() };
    return result;
  }

  return reduce(KEYS, {}, reduceKeys);
}

function getLastPressed({ key, keyPressed }) {
  function reduceKeys(result, times, keyName) {
    function getLatest(latest, time, code) {
      return latest && times[latest] > time ? latest : code;
    }

    switch (keyName) {
      case KEYS.DOWN:
      case KEYS.LEFT:
      case KEYS.RIGHT:
      case KEYS.UP: {
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
    case KEYS.DOWN:
    case KEYS.LEFT:
    case KEYS.RIGHT:
    case KEYS.UP: {
      return reduce(keyPressed, {}, reduceKeys).key;
    }

    default: {
      return undefined;
    }
  }
}

export function Provider({ children }) {
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

        if (!alreadyPressed) fireEvents({ event, key, type: DOWN });
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
            fireEvents({ event, key: lastPressed, type: DOWN });
          } else {
            fireEvents({ event, key, type: UP });
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
        const { keyCode } = event;
        const key = getKeyByCode(keyCode);
        down({ event, key, keyCode });
      }

      function onKeyUp(event) {
        const { keyCode } = event;
        const key = getKeyByCode(keyCode);
        up({ event, key, keyCode });
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
        [DOWN]: down,
        [UP]: up,
        on: {
          [DOWN](key, listener) {
            listeners.current[key][DOWN].add(listener);
          },
          [UP](key, listener) {
            listeners.current[key][UP].add(listener);
          },
        },
        off: {
          [DOWN](key, listener) {
            listeners.current[key][DOWN].delete(listener);
          },
          [UP](key, listener) {
            listeners.current[key][UP].delete(listener);
          },
        },
      };
    },
    [down, up],
  );

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
}
