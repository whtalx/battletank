import { Player } from '../../objects/player';

import { Projectile } from '../../objects/projectile';

import { changeStage } from '../../utils/game';
import { saveUpdates } from './store';
import { canFire } from '../../utils/tank';
import { splice } from '../../utils/iterable';
import { loop } from './loop';
import { nest } from './nest';

import PROJECTILE from '../../constants/projectile';
import MESSAGES from '../../constants/messages';
import GAME from '../../constants/game';

self.onmessage = function onMessage({ data: { type, payload } }) {
  saveUpdates(function updateState(state) {
    let updates = {};

    switch (type) {
      case MESSAGES.INIT: {
        updates.stage = 0;
        updates.status = GAME.STATUS.WAITING;
        const index = state.players.length;
        const player = Player({ index, level: 0, ...payload.session });
        updates.players = splice(state.players, index, player);

        self.postMessage({
          type: MESSAGES.SET_SESSION,
          payload: { id: player.id, index: player.index },
        });

        self.postMessage({ type });
        break;
      }

      case MESSAGES.SET_STAGE: {
        updates = changeStage({ players: state.players, stage: payload });
        break;
      }

      case MESSAGES.SET_STATE: {
        switch (payload.status) {
          case GAME.STATUS.RUNNING: {
            updates = {
              ...changeStage({ players: state.players, stage: state.stage }),
              players: state.players.map(Player.reset({ nest })),
              status: payload.status,
            };

            loop.start();
            break;
          }

          case GAME.STATUS.WAITING: {
            loop.stop();
            updates.status = payload.status;
            break;
          }

          default: {
            break;
          }
        }

        break;
      }

      case MESSAGES.SET_DIRECTION: {
        const { direction, session: { index, id } } = payload;

        if (id !== state.players[index].id) break;

        const player = { ...state.players[index] };

        if (direction) {
          player.direction = direction;
          player.moving = true;
        } else if (player.moving) {
          player.moving = false;
        }

        updates.players = splice(state.players, index, player);

        break;
      }

      case MESSAGES.FIRE: {
        const { session: { index, id } } = payload;
        const player = state.players[index];

        if (
          id !== player.id ||
          !canFire({
            id,
            projectiles: state.projectiles,
            projectilesNumber: player.projectilesNumber,
          })
        ) {
          break;
        }

        updates.projectiles = splice(
          state.projectiles,
          state.projectiles.length,
          Projectile({ parent: player, type: PROJECTILE.PARENT.PLAYER }),
        );

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
