import Player from '../objects/player';

import { ENEMIES, MAPS, PATTERNS } from '../data';

const enemiesCache = {};
const mapsCache = {};

function getEnemiesDetachment(stage) {
  const index = stage >= ENEMIES.length
    ? ENEMIES.length - 1
    : stage;

  function shapeEnemies(result, group) {
    if (!group.length) return result;

    const [level, count] = group;

    return result.concat(Array(count).fill(level));
  }

  if (!enemiesCache.hasOwnProperty(index)) {
    enemiesCache[index] = ENEMIES[index].reduce(shapeEnemies, []);
  }

  return enemiesCache[index];
}

function getMap(stage) {
  const index = stage % MAPS.length;

  function shapeMap(row) {
    function shapeRow(block) {
      const [type = 0, pattern = 0] = block;
      return {
        type,
        pattern: type ? PATTERNS[pattern] : [],
      };
    }

    return row.map(shapeRow);
  }

  if (!mapsCache.hasOwnProperty(index)) {
    mapsCache[index] = MAPS[index].map(shapeMap);
  }

  return mapsCache[index];
}

function getEnemySpawnTimeout({ players, stage }) {
  const index = stage >= MAPS.length
    ? MAPS.length - 1
    : stage;

  return 190 - index * 4 - (players - 1) * 20;
}

export function changeStage({ players, stage: index }) {
  const stage = index >= 0
    ? index % (MAPS.length * 2)
    : MAPS.length * 2 + index;

  return {
    defeated: false,
    enemies: [],
    enemiesDetachment: getEnemiesDetachment(stage),
    enemySpawnTimeout: getEnemySpawnTimeout({ players, stage }),
    projectiles: [],
    stage,
    map: getMap(stage),
  };
}

function makePlayer(index) {
  return Player({ index });
}

export function newGame({ players = 1, score = 0, stage = 0, ...rest }) {
  return {
    players: [...Array(players).keys()].map(makePlayer),
    score,
    ...changeStage({ players, stage }),
    ...rest,
  };
}
