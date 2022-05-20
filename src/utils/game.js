import { ENEMIES, MAPS } from '../data';

export function newGame({ level = 0, lives = 3, score = 0, ...rest }) {
  return {
    defeated: false,
    enemies: ENEMIES[level],
    level,
    lives,
    map: MAPS[level],
    score,
    ...rest,
  };
}
