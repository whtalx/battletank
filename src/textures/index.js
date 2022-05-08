import brick from './brick';
import tree from './tree';
import steel from './steel';
import water from './water';

import { BLOCK } from '../constants';

export default {
  [BLOCK.BRICK]: brick,
  [BLOCK.STEEL]: steel,
  [BLOCK.TREE]: tree,
  [BLOCK.WATER]: water,
};
