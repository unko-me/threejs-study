uniform float time;
uniform float size;

attribute float lifetime;
attribute float shift;

varying float t;
varying float alpha;

void main() {
  t = fract(time / lifetime + shift);
  float v = sqrt(t)/2.0;
  alpha = 1.0 - smoothstep(0.0, 1.0, t);
  vec3 p = position * vec3(v, t, v);
  vec4 mvPosition = modelViewMatrix * vec4(p, 1.8);
  gl_PointSize = size * (1.0 - t);
  gl_Position = projectionMatrix * mvPosition;
}