precision mediump float;

varying vec4 ecPosition;
varying vec3 ecNormal;
varying vec2 vUv;
varying vec3 viewDir;


void main() {

    ecPosition = modelViewMatrix * vec4(position, 1.0);
    vUv = uv;
    ecNormal = normalize(normalMatrix * normal);

    bool usePerspective = projectionMatrix[2][3] != 0.0;
    viewDir = usePerspective ? vec3(0,0,0) : normalize(-ecPosition.xyz);

    gl_Position = projectionMatrix * ecPosition;


}

