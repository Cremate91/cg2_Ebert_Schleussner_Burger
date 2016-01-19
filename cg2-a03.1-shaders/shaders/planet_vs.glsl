precision mediump float;

varying vec3 ecPosition;
varying vec3 ecNormal;
varying vec2 vUv;
varying vec3 viewDir;

void main() {
    vec4 ecPosition4 = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * ecPosition4;

    //warum das jetz wieder in eine Vector3 umgerechnet werden muss, weiß ich nicht..
    ecPosition = vec3(ecPosition4) / ecPosition4.w;
    vUv = uv;
    ecNormal = normalize(normalMatrix * normal);
    bool usePerspective = projectionMatrix[2][3] != 0.0;
        viewDir = usePerspective ? normalize(-ecPosition) : vec3(0,0,1);
}

//////////////////////////////////////////////
//http://www.mathematik.uni-marburg.de/~thormae/lectures/graphics1/code/WebGLShaderLightMat/ShaderLightMat.html
//////////////////////////////////////////////
