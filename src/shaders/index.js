import blockFragment from './block.frag';
import blockVertex from './block.vert';

import { BLOCK } from '../constants';

export const FRAGMENT = {
  [BLOCK.BRICK]: blockFragment,
  [BLOCK.STEEL]: blockFragment,
};

export const VERTEX = {
  [BLOCK.BRICK]: blockVertex,
  [BLOCK.STEEL]: blockVertex,
};
