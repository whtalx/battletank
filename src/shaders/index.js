import animatedFragment from './animated.frag';
import destructibleFragment from './destructible.frag';
import constantVertex from './constant.vert';
import animatedVertex from './animated.vert';
import constantFragment from './constant.frag';

import { SHADER } from '../constants';

export const FRAGMENT = {
  [SHADER.DESTRUCTIBLE]: destructibleFragment,
  [SHADER.CONSTANT]: constantFragment,
  [SHADER.ANIMATED]: animatedFragment,
};

export const VERTEX = {
  [SHADER.CONSTANT]: constantVertex,
  [SHADER.ANIMATED]: animatedVertex,
};
