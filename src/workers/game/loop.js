import { Player } from '../../objects/player';
import { Enemy } from '../../objects/enemy';
import { Loop } from '../../objects/loop';
import { Projectile } from '../../objects/projectile';

import { saveUpdates } from './store';
import { nest } from './nest';

function loopCallback(frame) {
  saveUpdates(function updateState(state) {
    state.projectiles = state.projectiles.reduce(Projectile.loop({ frame, nest }), []);
    state.players.forEach(Player.loop({ frame, nest, state }));
    state.enemies.forEach(Enemy.loop({ frame, nest, state }));

    // if (state.enemiesDetachment.length && frame % state.enemySpawnTimeout === 0) {
    //   const index = 20 - state.enemiesDetachment.length;
    //   const level = state.enemiesDetachment[0];
    //   state.enemiesDetachment = state.enemiesDetachment.slice(1);
    //   const enemy = Enemy({ index, level });
    //   state.enemies = [...state.enemies, enemy];
    // }
  });
}

export const loop = Loop(loopCallback);
