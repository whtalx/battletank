import { useMemo } from 'react';

import { reduce } from '../utils';

import { FRAGMENT, VERTEX } from '../shaders';
import { SHADER } from '../constants';

export default function useShader({ fragment, uniforms, vertex }) {
  const shader = useMemo(
    function factory() {
      function reduceUniforms(result, value, key) {
        result[key] = { value };
        return result;
      }

      return {
        fragmentShader: FRAGMENT[fragment] || FRAGMENT[SHADER.CONSTANT],
        vertexShader: VERTEX[vertex] || VERTEX[SHADER.CONSTANT],
        uniforms: reduce(uniforms, {}, reduceUniforms),
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fragment, vertex],
  );

  return shader;
}
