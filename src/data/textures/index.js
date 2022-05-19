import BASE from './base.json';
import BRICK from './brick.json';
import ICE from './ice.json';
import LEVEL from './level.json';
import LIVES from './lives.json';
import STEEL from './steel.json';
import TREE from './tree.json';
import UNIT from './unit.json';
import WATER from './water.json';

import { OBJECTS } from '../../constants';

export default {
  [OBJECTS.BASE]: BASE,
  [OBJECTS.BLOCK.BRICK]: BRICK,
  [OBJECTS.BLOCK.ICE]: ICE,
  [OBJECTS.BLOCK.STEEL]: STEEL,
  [OBJECTS.BLOCK.TREE]: TREE,
  [OBJECTS.BLOCK.WATER]: WATER,
  [OBJECTS.LEVEL]: LEVEL,
  [OBJECTS.LIVES]: LIVES,
  [OBJECTS.UNIT]: UNIT,
};
