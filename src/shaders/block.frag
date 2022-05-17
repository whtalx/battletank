varying vec2 v_uv;
uniform sampler2D u_map;
uniform mat4 u_pattern;

int getIndex(float x) {
  return int(4. * x);
}

int getPatternValue(vec2 uv) {
  return int(u_pattern[getIndex(1. - uv.y)][getIndex(uv.x)]);
}

void main() {
  if (getPatternValue(v_uv) != 1) discard;

  gl_FragColor = texture2D(u_map, v_uv * 2.);
}
