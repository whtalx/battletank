import { ENEMIES, MAPS, PATTERNS } from '../data';

function getEnemies(level) {
  return level >= ENEMIES.length
    ? ENEMIES[ENEMIES.length - 1]
    : ENEMIES[level];
}

function getMap(level) {
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

  const mapIndex = level % MAPS.length;
  return MAPS[mapIndex].map(shapeMap);
}

export function changeLevel(level) {
  const nextLevel = level >= 0 ? level % (MAPS.length * 2) : MAPS.length * 2 + level;
  return {
    defeated: false,
    enemies: getEnemies(level),
    level: nextLevel,
    map: getMap(nextLevel),
  };
}

export function newGame({ level = 0, lives = 3, score = 0, ...rest }) {
  return {
    lives,
    score,
    ...changeLevel(level),
    ...rest,
  };
}
