import React, { useContext, useEffect, useRef } from 'react';

import Background from '../Background';
import Terrain from '../Terrain';
import Text from '../Text';

import { decrement, increment } from '../../utils';
import { useKeyEvent, useStore } from '../../hooks';
import { postMessage } from '../../workers';
import { Layout } from '../../contexts';

import { GAME, MESSAGES, SETTINGS } from '../../constants';
import { COLORS } from '../../data';

function selector({ game: { setGame, ...rest } }) {
  return { game: rest };
}

export default function Game() {
  const { screen, view } = useContext(Layout.Context);
  const { game } = useStore(selector);
  const gameRef = useRef(game);

  function getStage(level) {
    const stage = level + 1;
    return stage < 10 ? ` ${stage}` : stage;
  }

  useKeyEvent({
    key: SETTINGS.KEYS.UP,
    listener() {
      postMessage({ type: MESSAGES.SET_LEVEL, payload: increment(gameRef.current.level) });
    },
  });

  useKeyEvent({
    key: SETTINGS.KEYS.DOWN,
    listener() {
      postMessage({ type: MESSAGES.SET_LEVEL, payload: decrement(gameRef.current.level) });
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
        <>
          <mesh>
            <planeBufferGeometry args={[view.width, view.height, 1]} />
            <meshBasicMaterial color={COLORS['00']} />
          </mesh>
          <Text
            color={COLORS['0D']}
            size={8}
            text={`STAGE ${getStage(game.level)}`}
            unit={screen.unit}
          />
        </>
      );
    }

    case GAME.STATUS.RUNNING: {
      return (
        <>
          <Background />
          <Terrain levelMap={game.map} />
        </>
      );
    }

    default: {
      return null;
    }
  }
}
