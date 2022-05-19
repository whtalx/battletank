varying vec2 v_uv;
uniform vec2 u_area;
uniform sampler2D u_map;
uniform vec2 u_offset;
uniform vec2 u_scale;

void main() {
  vec4 texel = texture2D(u_map, mod(v_uv, u_scale * u_area) / u_area + u_offset);

  if (texel.a == 0.) discard;

  gl_FragColor = texel;
}
