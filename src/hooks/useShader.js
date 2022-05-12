import { useMemo } from 'react';

import { reduce } from '../utils';

import { FRAGMENT, VERTEX } from '../shaders';

export default function useShader({ type, uniforms }) {
  const shader = useMemo(
    function factory() {
      function reduceUniforms(result, value, key) {
        result[key] = { value };
        return result;
      }

      return {
        fragmentShader: FRAGMENT[type],
        vertexShader: VERTEX[type],
        uniforms: reduce(uniforms, {}, reduceUniforms),
      };
    },
    [type, uniforms],
  );

  return shader;
}
