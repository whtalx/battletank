import React, { memo, useContext } from 'react';

import Text from '../Text';

import { Layout } from '../../contexts/layout';

import { useTexture } from '../../hooks/useTexture';

import { areEqual } from '../../utils/iterable';

import OBJECTS from '../../constants/objects';
import LAYOUT from '../../constants/layout';

import { COLORS } from '../../data';

const PLAYER_INDEX = ['I', 'Ⅱ'];

function Background({ enemies, players, stage }) {
  const { map, screen } = useContext(Layout);
  const blockSize = 8 * screen.unit;
  const left = (map.size + map.position[0]) / 2 + blockSize + screen.unit;
  const enemyUnit = useTexture(OBJECTS.UNIT);
  enemyUnit.repeat.set(1, 1);

  const playerLives = useTexture(OBJECTS.LIVES);
  playerLives.repeat.set(1, 1);

  const stageFlag = useTexture(OBJECTS.STAGE);
  stageFlag.repeat.set(1, 1);

  function renderEnemyUnit(index) {
    const position = [
      left + blockSize * (index % 2),
      (map.size - blockSize) / 2 - blockSize * Math.floor(index / 2),
      LAYOUT.Z_INDEX.STATS,
    ];

    return (
      <mesh key={`unit-${index}`} position={position}>
        <planeBufferGeometry args={[blockSize, blockSize]} />
        <meshBasicMaterial map={enemyUnit} transparent />
      </mesh>
    );
  }

  function renderPlayerLives(lives, index) {
    const position = [
      left,
      -blockSize - index * 24 * screen.unit,
      0,
    ];

    return (
      <group key={`player-${index}`} position={position}>
        <Text
          color={COLORS['1D']}
          text={`${PLAYER_INDEX[index]}P`}
          position={[blockSize / 2, 0, 1]}
          unit={screen.unit}
        />
        <mesh position={[0, -blockSize - screen.unit, LAYOUT.Z_INDEX.STATS]}>
          <planeBufferGeometry args={[blockSize, blockSize]} />
          <meshBasicMaterial map={playerLives} transparent />
        </mesh>
        <Text
          color={COLORS['1D']}
          text={lives}
          position={[blockSize / 2 + blockSize / 2, -blockSize, LAYOUT.Z_INDEX.STATS]}
          unit={screen.unit}
        />
      </group>
    );
  }

  function renderStage() {
    const position = [
      left,
      -64 * screen.unit,
      1,
    ];

    return (
      <group position={position}>
        <mesh position={[blockSize / 2, 0, LAYOUT.Z_INDEX.STATS]}>
          <planeBufferGeometry args={[blockSize * 2, blockSize * 2]} />
          <meshBasicMaterial map={stageFlag} transparent />
        </mesh>
        <Text
          color={COLORS['1D']}
          text={stage}
          position={[blockSize / 2, -1.5 * blockSize, LAYOUT.Z_INDEX.STATS]}
          unit={screen.unit}
        />
      </group>
    );
  }

  return (
    <>
      <mesh position={[0, 0, LAYOUT.Z_INDEX.BACKGROUND]}>
        <planeBufferGeometry args={[screen.width, screen.height]} />
        <meshBasicMaterial color={COLORS['00']} />
      </mesh>
      <mesh position={map.position}>
        <planeBufferGeometry args={[map.size, map.size]} />
        <meshBasicMaterial color={COLORS['1D']} />
      </mesh>
      {[...Array(enemies).keys()].map(renderEnemyUnit)}
      {players.map(renderPlayerLives)}
      {renderStage()}
    </>
  );
}

export default memo(Background, areEqual);
