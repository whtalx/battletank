import React, { useEffect, useRef } from 'react';

import Curtain from './Curtain';
import Round from './Round';

import { useKeyEvent } from '../../hooks/useKeyEvent';
import { useStore } from '../../hooks/useStore';

import { decrement, increment } from '../../utils/number';
import { postMessage } from '../../workers';

import EVENTS from '../../constants/events';
import GAME from '../../constants/game';
import MESSAGES from '../../constants/messages';
import SETTINGS from '../../constants/settings';
import TANK from '../../constants/tank';

function selector({ game: { stage, status }, session: { setSession, ...session } }) {
  return { game: { stage, status }, session };
}

export default function Game() {
  const state = useStore(selector);
  const stateRef = useRef(state);

  useEffect(
    function effect() {
      stateRef.current = state;
    },
    [state],
  );

  function getStringStage(stage) {
    const round = stage + 1;
    return round < 10 ? ` ${round}` : String(round);
  }

  useKeyEvent({
    key: SETTINGS.KEYS.UP,
    type: EVENTS.DOWN,
    listener() {
      switch (stateRef.current.game.status) {
        case GAME.STATUS.WAITING: {
          postMessage({
            type: MESSAGES.SET_STAGE,
            payload: increment(stateRef.current.game.stage),
          });
          break;
        }

        case GAME.STATUS.RUNNING: {
          postMessage({
            type: MESSAGES.SET_DIRECTION,
            payload: {
              direction: TANK.DIRECTION.NORTH,
              session: stateRef.current.session,
            },
          });
          break;
        }

        default: {
          break;
        }
      }
    },
  });

  useKeyEvent({
    key: SETTINGS.KEYS.DOWN,
    type: EVENTS.DOWN,
    listener() {
      switch (stateRef.current.game.status) {
        case GAME.STATUS.WAITING: {
          postMessage({
            type: MESSAGES.SET_STAGE,
            payload: decrement(stateRef.current.game.stage),
          });
          break;
        }

        case GAME.STATUS.RUNNING: {
          postMessage({
            type: MESSAGES.SET_DIRECTION,
            payload: {
              direction: TANK.DIRECTION.SOUTH,
              session: stateRef.current.session,
            },
          });
          break;
        }

        default: {
          break;
        }
      }
    },
  });

  useKeyEvent({
    key: SETTINGS.KEYS.LEFT,
    type: EVENTS.DOWN,
    listener() {
      switch (stateRef.current.game.status) {
        case GAME.STATUS.RUNNING: {
          postMessage({
            type: MESSAGES.SET_DIRECTION,
            payload: {
              direction: TANK.DIRECTION.WEST,
              session: stateRef.current.session,
            },
          });
          break;
        }

        default: {
          break;
        }
      }
    },
  });

  useKeyEvent({
    key: SETTINGS.KEYS.RIGHT,
    type: EVENTS.DOWN,
    listener() {
      switch (stateRef.current.game.status) {
        case GAME.STATUS.RUNNING: {
          postMessage({
            type: MESSAGES.SET_DIRECTION,
            payload: {
              direction: TANK.DIRECTION.EAST,
              session: stateRef.current.session,
            },
          });
          break;
        }

        default: {
          break;
        }
      }
    },
  });

  useKeyEvent({
    key: SETTINGS.KEYS.UP,
    type: EVENTS.UP,
    listener() {
      switch (stateRef.current.game.status) {
        case GAME.STATUS.RUNNING: {
          postMessage({
            type: MESSAGES.SET_DIRECTION,
            payload: {
              session: stateRef.current.session,
            },
          });
          break;
        }

        default: {
          break;
        }
      }
    },
  });

  useKeyEvent({
    key: SETTINGS.KEYS.DOWN,
    type: EVENTS.UP,
    listener() {
      switch (stateRef.current.game.status) {
        case GAME.STATUS.RUNNING: {
          postMessage({
            type: MESSAGES.SET_DIRECTION,
            payload: {
              session: stateRef.current.session,
            },
          });
          break;
        }

        default: {
          break;
        }
      }
    },
  });

  useKeyEvent({
    key: SETTINGS.KEYS.LEFT,
    type: EVENTS.UP,
    listener() {
      switch (stateRef.current.game.status) {
        case GAME.STATUS.RUNNING: {
          postMessage({
            type: MESSAGES.SET_DIRECTION,
            payload: {
              session: stateRef.current.session,
            },
          });
          break;
        }

        default: {
          break;
        }
      }
    },
  });

  useKeyEvent({
    key: SETTINGS.KEYS.RIGHT,
    type: EVENTS.UP,
    listener() {
      switch (stateRef.current.game.status) {
        case GAME.STATUS.RUNNING: {
          postMessage({
            type: MESSAGES.SET_DIRECTION,
            payload: {
              session: stateRef.current.session,
            },
          });
          break;
        }

        default: {
          break;
        }
      }
    },
  });

  useKeyEvent({
    key: SETTINGS.KEYS.START,
    type: EVENTS.DOWN,
    listener() {
      postMessage({
        type: MESSAGES.SET_STATE,
        payload: {
          session: stateRef.current.session,
          status: stateRef.current.game.status === GAME.STATUS.WAITING
            ? GAME.STATUS.RUNNING
            : GAME.STATUS.WAITING,
        },
      });
    },
  });

  switch (state.game.status) {
    case GAME.STATUS.WAITING: {
      return (
        <Curtain stringStage={getStringStage(state.game.stage)} />
      );
    }

    case GAME.STATUS.RUNNING: {
      return (
        <Round game={state.game} stringStage={getStringStage(state.game.stage)} />
      );
    }

    default: {
      return null;
    }
  }
}
