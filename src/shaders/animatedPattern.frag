varying vec2 v_uv;
uniform vec2 u_area;
uniform sampler2D u_map;
uniform vec2 u_offset;
uniform vec2 u_scale;
uniform mat2 u_pattern;

int getIndex(float x) {
  return int(2. * x);
}

float getPatternValue(vec2 uv) {
  return u_pattern[getIndex(1. - uv.y)][getIndex(uv.x)];
}

void main() {
  vec4 texel = texture2D(u_map, mod(v_uv, u_scale * u_area) / u_area + u_offset * getPatternValue(v_uv / u_scale));

  if (texel.a == 0.) discard;

  gl_FragColor = texel;
}
