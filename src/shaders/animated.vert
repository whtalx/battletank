varying vec2 v_uv;
uniform vec2 u_scale;

void main() {
  v_uv = uv * u_scale;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}