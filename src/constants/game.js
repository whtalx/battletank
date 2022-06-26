import OBJECTS from './objects';

const STATUS = {
  COUNT: 'count',
  IDLE: 'idle',
  INTRO: 'intro',
  PAUSED: 'pause',
  RUNNING: 'run',
  WAITING: 'wait',
};

const BONUS_TIMEOUT = {
  [OBJECTS.BONUS.TIMER]: 600,
  [OBJECTS.BONUS.SHOWEL]: 1200,
};

const FRAME = 1000 / 60;

export default {
  BONUS_TIMEOUT,
  FRAME,
  STATUS,
};
