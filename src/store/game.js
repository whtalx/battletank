import produce from 'immer';

export default function game(set) {
  return {
    setGame(state) {
      return set(produce(state));
    },
  };
}
