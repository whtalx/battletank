varying vec2 v_uv;
uniform vec2 u_area;
uniform mat3 u_color;
uniform sampler2D u_map;
uniform vec2 u_offset;
uniform vec2 u_scale;

void main() {
  vec4 texel = texture2D(u_map, mod(v_uv, u_scale * u_area) / u_area + u_offset);

  if (texel.a == 0.) discard;

  if (texel.r == 1.) {
    texel = vec4(u_color[0], 1.);
  } else if (texel.g == 1.) {
    texel = vec4(u_color[1], 1.);
  } else if (texel.b == 1.) {
    texel = vec4(u_color[2], 1.);
  }

  gl_FragColor = texel;
}
