import React from 'react';

import Background from '../Background';
import Tank from '../Tank';
import Terrain from '../Terrain';

import { useStore } from '../../hooks/useStore';

function reducePlayers(result, player) {
  result.lives.push(String(player.lives));
  result.tanks.push(<Tank key={player.id} {...player} />);
  return result;
}

function selector({ game: { enemiesDetachment, map, players } }) {
  return { enemiesDetachment, map, players };
}

export default function Round({ stringStage }) {
  const { enemiesDetachment, map, players } = useStore(selector);
  const { lives, tanks } = players.reduce(reducePlayers, { lives: [], tanks: [] });

  return (
    <>
      <Background
        enemies={enemiesDetachment.length}
        players={lives}
        stage={stringStage}
      />
      <Terrain map={map} />
      {tanks}
    </>
  );
}
