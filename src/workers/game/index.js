import { Player } from '../../objects';

import { changeStage } from '../../utils/game';
import { saveUpdates } from './store';
import { loop } from './loop';
import { nest } from './nest';

import { GAME, MESSAGES } from '../../constants';

self.onmessage = function onMessage({ data: { type, payload } }) {
  saveUpdates(function updateState(state) {
    let updates = {};

    switch (type) {
      case MESSAGES.INIT: {
        self.postMessage({ type });
        updates.status = GAME.STATUS.WAITING;
        break;
      }

      case MESSAGES.SET_STAGE: {
        updates = changeStage({ players: state.players.length, stage: payload });
        break;
      }

      case MESSAGES.SET_STATE: {
        switch (payload) {
          case GAME.STATUS.RUNNING: {
            updates = {
              ...changeStage({ players: state.players.length, stage: state.stage }),
              players: state.players.map(Player.reset({ nest })),
              status: payload,
            };

            loop.start();
            break;
          }

          case GAME.STATUS.WAITING: {
            loop.stop();
            updates.status = payload;
            break;
          }

          default: {
            break;
          }
        }

        break;
      }

      default: {
        break;
      }
    }

    if (!Object.values(updates).length) return;

    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        state[key] = updates[key];
      }
    }
  });
};
