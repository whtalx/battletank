import BASE from './base.json';
import BRICK from './brick.json';
import D_PAD from './d-pad.json';
import FIRE from './fire.json';
import ICE from './ice.json';
import LIVES from './lives.json';
import PLAYER_BASIC from './player-basic.json';
import PLAYER_DOUBLE_SHOT from './player-double-shot.json';
import PLAYER_FAST_SHOT from './player-fast-shot.json';
import PLAYER_POWER_SHOT from './player-power-shot.json';
import SHIELD from './shield.json';
import STAGE from './stage.json';
import START from './start.json';
import STEEL from './steel.json';
import TREE from './tree.json';
import UNIT from './unit.json';
import WATER from './water.json';

import OBJECTS from '../../constants/objects';
import OVERLAY from '../../constants/overlay';
import PLAYER from '../../constants/player';

export default {
  [OBJECTS.BLOCK.BASE]: BASE,
  [OBJECTS.BLOCK.BRICK]: BRICK,
  [OBJECTS.BLOCK.ICE]: ICE,
  [OBJECTS.BLOCK.STEEL]: STEEL,
  [OBJECTS.BLOCK.TREE]: TREE,
  [OBJECTS.BLOCK.WATER]: WATER,
  [OBJECTS.SHIELD]: SHIELD,
  [OBJECTS.STAGE]: STAGE,
  [OBJECTS.LIVES]: LIVES,
  [OBJECTS.UNIT]: UNIT,
  [OVERLAY.D_PAD]: D_PAD,
  [OVERLAY.FIRE]: FIRE,
  [OVERLAY.START]: START,
  [PLAYER.TYPE.BASIC]: PLAYER_BASIC,
  [PLAYER.TYPE.DOUBLE_SHOT]: PLAYER_DOUBLE_SHOT,
  [PLAYER.TYPE.FAST_SHOT]: PLAYER_FAST_SHOT,
  [PLAYER.TYPE.POWER_SHOT]: PLAYER_POWER_SHOT,
};
