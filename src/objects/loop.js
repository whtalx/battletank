import GAME from '../constants/game';

export function Loop(callback) {
  let interval;
  let frame = 0;

  function loopCallback() {
    callback(frame);
    frame = (frame + 1) % 4;
  }

  return {
    start() {
      interval = setInterval(loopCallback, GAME.FRAME);
    },
    stop() {
      interval = clearInterval(interval);
      frame = 0;
    },
  };
}
