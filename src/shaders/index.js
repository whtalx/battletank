import animatedFragment from './animated.frag';
import animatedColorMapFragment from './animatedColorMap.frag';
import animatedPatternFragment from './animatedPattern.frag';
// import colorMapFragment from './colorMap.frag';
import constantFragment from './constant.frag';
import patternFragment from './pattern.frag';
import animatedVertex from './animated.vert';
import animatedTransformVertex from './animatedTransform.vert';
import constantVertex from './constant.vert';
// import transformVertex from './transform.vert';

import SHADER from '../constants/shader';

export const FRAGMENT = {
  [SHADER.ANIMATED]: animatedFragment,
  [SHADER.ANIMATED_COLOR_MAP]: animatedColorMapFragment,
  [SHADER.ANIMATED_PATTERN]: animatedPatternFragment,
  // [SHADER.COLOR_MAP]: colorMapFragment,
  [SHADER.CONSTANT]: constantFragment,
  [SHADER.PATTERN]: patternFragment,
};

export const VERTEX = {
  [SHADER.ANIMATED]: animatedVertex,
  [SHADER.ANIMATED_TRANSFORM]: animatedTransformVertex,
  [SHADER.CONSTANT]: constantVertex,
  // [SHADER.TRANSFORM]: transformVertex,
};
