precision mediump float;


//uniform lights (we only have the sun)
uniform vec3 ambientLightColor[1];

uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];
uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];

// uniform material constants k_a, k_d, k_s, alpha
uniform vec3 phongAmbientMaterial;
uniform vec3 phongDiffuseMaterial;
uniform vec3 phongSpecularMaterial;
uniform float phongShininessMaterial;
// uniform sampler2D textures

// three js only supports int no bool
// if you want a boolean value in the shader, use int

// data from the vertex shader
varying vec4 ecPosition;
varying vec3 ecNormal;
varying vec2 vUv;
varying vec3 viewDir;


vec3 phong(vec3 p, vec3 v, vec3 n, vec3 lightPos, vec3 lightColor) {
    if(dot(v,n) < 0.0)
        return vec3(0,0,0); // back-face
    vec3 toLight = normalize(lightPos - p);
    vec3 reflectLight = reflect(-toLight, n);
    float ndots = max( dot(toLight,n), 0.0);
    float rdotv = max( dot(reflectLight, v), 0.0);
    vec3 ambi = phongAmbientMaterial * ambientLightColor[0];
    vec3 diff = phongDiffuseMaterial * ndots * lightColor;
    vec3 spec = phongSpecularMaterial * pow(rdotv, phongShininessMaterial ) *lightColor;
    return ambi + diff + spec;
}

void main() {
/*
    // get color from different textures
    //vec3 color = texture2D(textureUniform, texCoord).rgb;

    // normalize normal after projection

    // do we use a perspective or an orthogonal projection matrix?
    //bool usePerspective = projectionMatrix[2][3] != 0.0;
    // for perspective mode, the viewing direction (in eye coords) points
    // from the vertex to the origin (0,0,0) --> use -ecPosition as direction.
    // for orthogonal mode, the viewing direction is simply (0,0,1)

    // calculate color using phong illumination
    // depending on GUI checkbox:
    // color from night texture and clouds are added to ambient term (instead of ambient material k_a)
    // color from day texture are added to diffuse term (instead of diffuse material k_d)

    // Note: the texture value might have to get rescaled (gamma corrected)
    //       e.g. color = pow(color, vec3(0.6))*2.0;

    // vector from light to current point
    vec3 l = normalize(directionalLightDirection[0]);


    // diffuse contribution
    vec3 diffuseCoeff = (daytimeTextureBool == 1 )? dayCol : diffuseMaterial;
    // clouds at day?
    if(cloudsTextureBool == 1) {
        diffuseCoeff = (1.0-cloudsCol)*diffuseCoeff + cloudsCol*vec3(1,1,1);
    }
    // final diffuse term for daytime
    vec3 diffuse =  diffuseCoeff * directionalLightColor[0] * ndotl;

    // ambient part contains lights; modify depending on time of day
    // when ndotl == 1.0 the ambient term should be zero

    vec3 color = ambient + diffuse + specular;

    gl_FragColor = vec4(color, 1.0);*/


    // get color from different textures
    //vec3 color = texture2D(textureUniform, texCoord).rgb;

    // normalize normal after projection
    //vec3 ecNormal = normalize(normalMatrix * normal);
    // do we use a perspective or an orthogonal projection matrix?
    //bool usePerspective = projectionMatrix[2][3] != 0.0;
    // for perspective mode, the viewing direction (in eye coords) points
    // from the vertex to the origin (0,0,0) --> use -ecPosition as direction.
    // for orthogonal mode, the viewing direction is simply (0,0,1)
    //vec3 viewDir = usePerspective ? vec3(0,0,0) : normalize(-ecPosition.xyz);
    // calculate color using phong illumination
    // depending on GUI checkbox:
    // color from night texture and clouds are added to ambient term (instead of ambient material k_a)
    // color from day texture are added to diffuse term (instead of diffuse material k_d)
    vec3 phongColor = phong(ecPosition.xyz, viewDir, ecNormal, directionalLightDirection[0], directionalLightColor[0]);
    // Note: the texture value might have to get rescaled (gamma corrected)
    //       e.g. color = pow(color, vec3(0.6))*2.0;

    // vector from light to current point
    //vec3 l = normalize(directionalLightDirection[0]);


    // diffuse contribution
    //vec3 diffuseCoeff = (daytimeTextureBool == 1 )? dayCol : diffuseMaterial;
    // clouds at day?
//    if(cloudsTextureBool == 1) {
//        diffuseCoeff = (1.0-cloudsCol)*diffuseCoeff + cloudsCol*vec3(1,1,1);
//    }
    // final diffuse term for daytime
    //vec3 diffuse =  diffuseCoeff * directionalLightColor[0] * ndotl;

    // ambient part contains lights; modify depending on time of day
    // when ndotl == 1.0 the ambient term should be zero

//    vec3 color = ambient + diffuse + specular;
//
//    vec3 light = vec3(0.5, 0.2, 1.0);
//
//    light = normalize(light);
//
//    float dProd = max(0.0, dot(ecNormal, light));

    gl_FragColor = vec4(phongColor, 1.0);

}
