import React, { useContext } from 'react';

import Background from '../Background';
import Terrain from '../Terrain';
import Text from '../Text';

import { changeLevel, decrement, increment } from '../../utils';
import { useKeyEvent } from '../../hooks';
import { useStore } from '../../store';
import { Layout } from '../../contexts';

import { GAME, SETTINGS } from '../../constants';
import { COLORS } from '../../data';

function selector({ game: { setGame, ...rest } }) {
  return {
    game: rest,
    setGame,
  };
}

export default function Game() {
  const { screen, view } = useContext(Layout.Context);
  const { game, setGame } = useStore(selector);

  function setLevel(updater) {
    return function updateLevel(state) {
      state.game = { ...game, ...changeLevel(updater(state.game.level)) };
    };
  }

  function getStage(level) {
    const stage = level + 1;
    return stage < 10 ? ` ${stage}` : stage;
  }

  useKeyEvent({
    key: SETTINGS.KEYS.UP,
    listener() {
      setGame(setLevel(increment));
    },
  });

  useKeyEvent({
    key: SETTINGS.KEYS.DOWN,
    listener() {
      setGame(setLevel(decrement));
    },
  });

  useKeyEvent({
    key: SETTINGS.KEYS.START,
    listener() {
      setGame(function toggleDefeated(state) {
        state.game.defeated = !state.game.defeated;
      });
    },
  });

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
