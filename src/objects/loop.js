import { FRAME } from '../constants/game';

export default function Loop(callback) {
  let interval;
  let frame = 0;

  function loopCallback() {
    frame += 1;
    callback(frame);
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
