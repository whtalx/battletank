import React, { useContext, useEffect, useRef } from 'react';

import Background from '../Background';
import Terrain from '../Terrain';
import Text from '../Text';

import { useKeyEvent, useStore } from '../../hooks';
import { decrement, increment } from '../../utils';
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

  function getStage(stage) {
    const round = stage + 1;
    return round < 10 ? ` ${round}` : String(round);
  }

  function getLives({ lives }) {
    return String(lives);
  }

  useKeyEvent({
    key: SETTINGS.KEYS.UP,
    listener() {
      postMessage({
        type: MESSAGES.SET_STAGE,
        payload: increment(gameRef.current.stage),
      });
    },
  });

  useKeyEvent({
    key: SETTINGS.KEYS.DOWN,
    listener() {
      postMessage({
        type: MESSAGES.SET_STAGE,
        payload: decrement(gameRef.current.stage),
      });
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
            text={`STAGE ${getStage(game.stage)}`}
            unit={screen.unit}
          />
        </>
      );
    }

    case GAME.STATUS.RUNNING: {
      const { enemiesDetachment, map, players, stage } = game;

      return (
        <>
          <Background
            enemies={enemiesDetachment.length}
            players={players.map(getLives)}
            stage={getStage(stage)}
          />
          <Terrain map={map} />
        </>
      );
    }

    default: {
      return null;
    }
  }
}
