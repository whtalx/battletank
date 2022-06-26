const KEYS = {
  START: 'start',
  SELECT: 'select',
  FIRE: 'fire',
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
};

const DEFAULT = {
  keyBindings: {
    [KEYS.START]: 13,
    [KEYS.SELECT]: 16,
    [KEYS.FIRE]: [88, 90, 190, 191],
    [KEYS.UP]: [38, 87],
    [KEYS.DOWN]: [40, 83],
    [KEYS.LEFT]: [37, 65],
    [KEYS.RIGHT]: [39, 68],
  },
};

export default {
  DEFAULT,
  KEYS,
};
