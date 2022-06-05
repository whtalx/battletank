export default function Loop(callback) {
  let interval;
  let frame = 0;

  function loopCallback() {
    frame += 1;
    callback(frame);
  }

  return {
    start() {
      interval = setInterval(loopCallback, 1000 / 60);
    },
    stop() {
      interval = clearInterval(interval);
      frame = 0;
    },
  };
}
