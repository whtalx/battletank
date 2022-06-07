varying vec2 v_uv;
uniform vec2 u_scale;
uniform bool u_rotation;
uniform vec2 u_transform;

void main() {
  if (u_rotation) {
    v_uv = uv.yx * u_transform * u_scale;
  } else {
    v_uv = uv * u_transform * u_scale;
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}