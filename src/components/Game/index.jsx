import React, { useContext } from 'react';

import Background from '../Background';
import Terrain from '../Terrain';
import Text from '../Text';

import { useStore } from '../../store';
import { useKeyEvent } from '../../hooks';

import { GAME, SETTINGS } from '../../constants';
import { COLORS, MAPS } from '../../data';
import { Layout } from '../../contexts';

function selector({ game: { setGame, ...rest } }) {
  return {
    game: rest,
    setGame,
  };
}

export default function Game() {
  const { screen, view } = useContext(Layout.Context);
  const { game, setGame } = useStore(selector);

  function setStage(updater) {
    return function updateLevel(state) {
      const newLevel = updater(state.game.level);
      state.game.level = newLevel >= 0 ? newLevel % 70 : 69;
    };
  }

  function getStage(level) {
    const stage = level + 1;
    return stage < 10 ? ` ${stage}` : stage;
  }

  useKeyEvent({
    key: SETTINGS.KEYS.UP,
    listener() {
      setGame(setStage(function increment(x) {
        return x + 1;
      }));
    },
  });

  useKeyEvent({
    key: SETTINGS.KEYS.DOWN,
    listener() {
      setGame(setStage(function decrement(x) {
        return x - 1;
      }));
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
          <Terrain levelMap={MAPS[game.level]} />
        </>
      );
    }

    default: {
      return null;
    }
  }
}
