import blockFragment from './block.frag';
import blockVertex from './block.vert';

import { OBJECTS } from '../constants';

export const FRAGMENT = {
  [OBJECTS.BLOCK.BRICK]: blockFragment,
  [OBJECTS.BLOCK.STEEL]: blockFragment,
};

export const VERTEX = {
  [OBJECTS.BLOCK.BRICK]: blockVertex,
  [OBJECTS.BLOCK.STEEL]: blockVertex,
};
