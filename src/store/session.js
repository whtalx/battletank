import produce from 'immer';

import { getFromLocalStorage } from '../utils/localStorage';

export default function session(set) {
  return {
    ...getFromLocalStorage({ hiScore: 20000 }),
    setSession(state) {
      return set(produce(state));
    },
  };
}
