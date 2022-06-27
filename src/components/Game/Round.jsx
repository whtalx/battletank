import React from 'react';

import Background from '../Background';
import Hit from '../Hit';
import Projectile from '../Projectile';
import Tank from '../Tank';
import Terrain from '../Terrain';

import { useStore } from '../../hooks/useStore';

function reducePlayers(result, player) {
  result.lives.push(String(player.lives));
  result.tanks.push(<Tank key={player.id} {...player} />);
  return result;
}

function selector({ game: { enemiesDetachment, map, players, projectiles } }) {
  return { enemiesDetachment, map, players, projectiles };
}

export default function Round({ stringStage }) {
  const { enemiesDetachment, map, players, projectiles } = useStore(selector);
  const { lives, tanks } = players.reduce(reducePlayers, { lives: [], tanks: [] });

  function renderProjectile({ direction, explosion, id, position }) {
    return explosion
      ? <Hit key={id} explosion={explosion} position={position} />
      : <Projectile key={id} direction={direction} position={position} />;
  }

  return (
    <>
      <Background
        enemies={enemiesDetachment.length}
        players={lives}
        stage={stringStage}
      />
      <Terrain map={map} />
      {tanks}
      {projectiles.map(renderProjectile)}
    </>
  );
}
