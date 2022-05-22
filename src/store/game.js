import produce from 'immer';

import { getFromLocalStorage, newGame } from '../utils';

export default function game(set) {
  return {
    ...newGame(getFromLocalStorage({ hiScore: 20000 })),
    setGame(state) {
      return set(produce(state));
    },
  };
}
