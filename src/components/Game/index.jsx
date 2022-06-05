import React, { useEffect, useRef } from 'react';

import Curtain from './Curtain';
import Round from './Round';

import { useKeyEvent, useStore } from '../../hooks';
import { decrement, increment } from '../../utils';
import { postMessage } from '../../workers';

import { GAME, MESSAGES, SETTINGS } from '../../constants';

function selector({ game: { stage, status } }) {
  return { game: { stage, status } };
}

export default function Game() {
  const { game } = useStore(selector);
  const gameRef = useRef(game);

  function getStringStage(stage) {
    const round = stage + 1;
    return round < 10 ? ` ${round}` : String(round);
  }

  useKeyEvent({
    key: SETTINGS.KEYS.UP,
    listener() {
      if (gameRef.current.status === GAME.STATUS.WAITING) {
        postMessage({
          type: MESSAGES.SET_STAGE,
          payload: increment(gameRef.current.stage),
        });
      }
    },
  });

  useKeyEvent({
    key: SETTINGS.KEYS.DOWN,
    listener() {
      if (gameRef.current.status === GAME.STATUS.WAITING) {
        postMessage({
          type: MESSAGES.SET_STAGE,
          payload: decrement(gameRef.current.stage),
        });
      }
    },
  });

  useKeyEvent({
    key: SETTINGS.KEYS.START,
    listener() {
      postMessage({
        type: MESSAGES.SET_STATE,
        payload: gameRef.current.status === GAME.STATUS.WAITING
          ? GAME.STATUS.RUNNING
          : GAME.STATUS.WAITING,
      });
    },
  });

  useEffect(
    function effect() {
      gameRef.current = game;
    },
    [game],
  );

  switch (game.status) {
    case GAME.STATUS.WAITING: {
      return (
        <Curtain stringStage={getStringStage(game.stage)} />
      );
    }

    case GAME.STATUS.RUNNING: {
      return (
        <Round game={game} stringStage={getStringStage(game.stage)} />
      );
    }

    default: {
      return null;
    }
  }
}
