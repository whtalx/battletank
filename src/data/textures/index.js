import BASE from './base.json';
import BRICK from './brick.json';
import D_PAD from './d-pad.json';
import FIRE from './fire.json';
import ICE from './ice.json';
import STAGE from './stage.json';
import LIVES from './lives.json';
import START from './start.json';
import STEEL from './steel.json';
import TREE from './tree.json';
import UNIT from './unit.json';
import WATER from './water.json';

import { OBJECTS, OVERLAY } from '../../constants';

export default {
  [OBJECTS.BASE]: BASE,
  [OBJECTS.BLOCK.BRICK]: BRICK,
  [OBJECTS.BLOCK.ICE]: ICE,
  [OBJECTS.BLOCK.STEEL]: STEEL,
  [OBJECTS.BLOCK.TREE]: TREE,
  [OBJECTS.BLOCK.WATER]: WATER,
  [OBJECTS.STAGE]: STAGE,
  [OBJECTS.LIVES]: LIVES,
  [OBJECTS.UNIT]: UNIT,
  [OVERLAY.D_PAD]: D_PAD,
  [OVERLAY.FIRE]: FIRE,
  [OVERLAY.START]: START,
};
