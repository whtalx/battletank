varying vec2 v_uv;
uniform vec2 u_area;
uniform sampler2D u_map;
uniform mat4 u_pattern;

int getIndex(float x) {
  return int(4. * x);
}

float getPatternValue(vec2 uv) {
  return u_pattern[getIndex(1. - uv.y)][getIndex(uv.x)];
}

void main() {
  if (getPatternValue(v_uv) != 1.) discard;

  vec4 texel = texture2D(u_map, mod(v_uv, u_area) / u_area);

  if (texel.a == 0.) discard;

  gl_FragColor = texel;
}
