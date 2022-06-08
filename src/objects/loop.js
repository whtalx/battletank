import { FRAME } from '../constants/game';

export default function Loop(callback) {
  let interval;
  let frame = 0;

  function loopCallback() {
    callback(frame);
    frame = (frame + 1) % 4;
  }

  return {
    start() {
      interval = setInterval(loopCallback, FRAME);
    },
    stop() {
      interval = clearInterval(interval);
      frame = 0;
    },
  };
}
