import animatedFragment from './animated.frag';
import animatedPatternFragment from './animatedPattern.frag';
import patternFragment from './pattern.frag';
import constantVertex from './constant.vert';
import animatedVertex from './animated.vert';
import constantFragment from './constant.frag';

import { SHADER } from '../constants';

export const FRAGMENT = {
  [SHADER.ANIMATED]: animatedFragment,
  [SHADER.ANIMATED_PATTERN]: animatedPatternFragment,
  [SHADER.CONSTANT]: constantFragment,
  [SHADER.PATTERN]: patternFragment,
};

export const VERTEX = {
  [SHADER.CONSTANT]: constantVertex,
  [SHADER.ANIMATED]: animatedVertex,
};
