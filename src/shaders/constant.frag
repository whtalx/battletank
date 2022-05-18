varying vec2 v_uv;
uniform sampler2D u_map;

void main() {
  vec4 texel = texture2D(u_map, mod(v_uv, .5) * 2.);

  if (texel.a == 0.) discard;

  gl_FragColor = texel;
}
