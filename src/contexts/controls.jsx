import React, { createContext, useEffect, useMemo, useRef } from 'react';

import { forEach, reduce } from '../utils';
import { useStore } from '../store';

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
    result[key] = { down: new Set(), up: new Set() };
    return result;
  }

  return reduce(KEYS, {}, reduceKeys);
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

  useEffect(
    function effect() {
      function getKeyByCode(keyCode) {
        function reduceKeyBindings(result, codes, key) {
          return result || (codes.has(keyCode) ? key : result);
        }

        return reduce(bindings, undefined, reduceKeyBindings);
      }

      function getLastPressed(key) {
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
            return reduce(keyPressed.current, {}, reduceKeys).key;
          }

          default: {
            return undefined;
          }
        }
      }

      function onKeyDown(event) {
        const { keyCode } = event;
        const key = getKeyByCode(keyCode);

        if (key && !keyPressed.current[key]?.hasOwnProperty(keyCode)) {
          const alreadyPressed = !!Object.values(keyPressed.current[key] || {}).length;

          keyPressed.current[key] = {
            ...keyPressed.current[key],
            [keyCode]: Date.now(),
          };

          if (!alreadyPressed) fireEvents({ event, key, type: 'down' });
        }
      }

      function onKeyUp(event) {
        const { keyCode } = event;
        const key = getKeyByCode(keyCode);

        if (key && keyPressed.current[key]?.hasOwnProperty(keyCode)) {
          const { [keyCode]: time, ...rest } = keyPressed.current[key];

          if (Object.values(rest).length) {
            keyPressed.current[key] = rest;
          } else {
            delete keyPressed.current[key];

            const lastPressed = getLastPressed(key);

            if (lastPressed) {
              fireEvents({ event, key: lastPressed, type: 'down' });
            } else {
              fireEvents({ event, key, type: 'up' });
            }
          }
        }
      }

      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('keyup', onKeyUp);

      return function cleanUp() {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
      };
    },
    [bindings],
  );

  const contextValue = useMemo(
    function memoize() {
      return {
        on: {
          down(key, listener) {
            listeners.current[key].down.add(listener);
          },
          up(key, listener) {
            listeners.current[key].up.add(listener);
          },
        },
        off: {
          down(key, listener) {
            listeners.current[key].down.delete(listener);
          },
          up(key, listener) {
            listeners.current[key].up.delete(listener);
          },
        },
      };
    },
    [],
  );

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
}
