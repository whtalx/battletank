varying vec2 v_uv;
uniform vec2 u_area;
uniform sampler2D u_map;

void main() {
  vec4 texel = texture2D(u_map, mod(v_uv, u_area) / u_area);

  if (texel.a == 0.) discard;

  gl_FragColor = texel;
}
