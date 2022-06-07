import { BONUS } from './objects';

export const STATUS = {
  COUNT: 'count',
  IDLE: 'idle',
  INTRO: 'intro',
  PAUSED: 'pause',
  RUNNING: 'run',
  WAITING: 'wait',
};

export const BONUS_TIMEOUT = {
  [BONUS.TIMER]: 600,
  [BONUS.SHOWEL]: 1200,
};

export const FRAME = 1000 / 60;
