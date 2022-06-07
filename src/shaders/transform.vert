varying vec2 v_uv;
uniform bool u_rotation;
uniform vec2 u_transform;

void main() {
  if (u_rotation) {
    v_uv = uv.yx * u_transform;
  } else {
    v_uv = uv * u_transform;
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}