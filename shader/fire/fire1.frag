uniform vec3 startColor;
uniform vec3 offsetColor;
uniform sampler2D texture;

varying float t;
varying float alpha;

void main() {
  vec3 color = startColor + offsetColor * vec3(t, t, t);
  gl_FragColor = texture2D(texture, gl_PointCoord) * vec4(color, alpha);
}

