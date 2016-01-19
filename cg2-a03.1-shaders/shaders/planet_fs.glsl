precision mediump float;

// uniform lights (we only have the sun)
uniform vec3 directionalLightColor[MAX_DIR_LIGHTS];
uniform vec3 directionalLightDirection[MAX_DIR_LIGHTS];
//now sun + ambientLight
uniform vec3 ambientLightColor[1];

// uniform material constants k_a, k_d, k_s, alpha
uniform vec3 ambientMaterial;
uniform vec3 diffuseMaterial;
uniform vec3 specularMaterial;
uniform float shininessMaterial;

// uniform sampler2D textures


// three js only supports int no bool
// if you want a boolean value in the shader, use int


//Phong Shading
/*vec3 phong(vec3 p, vec3 v, vec3 n) {
    if(dot(v,n) < 0.0)
        return vec3(0,0,0); // back-face

    vec3 color;
    vec3 diff;
    vec3 spec;

    vec3 ambi = ambientMaterial * ambientLightColor[0];
    color += ambi;

    for(int i = 0; i < MAX_DIR_LIGHTS; i++){
        vec3 toLight = normalize(directionalLightDirection[i] - p);
        vec3 reflectLight = reflect(-toLight, n);

        //Lambert
        float ndots = max( dot(toLight,n), 0.0);
        //specAngle
        float rdotv = max( dot(reflectLight, v), 0.0);

        //Sum of diffuse color
        diff += directionalLightColor[i] * ndots;
        //Sum of specular color
        spec += directionalLightColor[i] * pow(rdotv, shininessMaterial);

    }

    diff = (diffuseMaterial * diff);
    spec = (specularMaterial * spec);

    //Phong Shading
    return color + diff + spec;
}*/

// data from the vertex shader
varying vec3 ecPosition; //vec3
varying vec3 ecNormal; //normalized
varying vec2 vUv;
varying vec3 viewDir;

void main() {

    vec3 lightDir = normalize(directionalLightDirection[0] - ecPosition);

    float lambertian = max(dot(lightDir,ecNormal), 0.0);
    float specular = 0.0;

    if(lambertian > 0.0) {
       //without blinn phong
//       vec3 reflectDir = reflect(-lightDir, ecNormal);
//       float specAngle = max(dot(reflectDir, viewDir), 0.0);
       //with blinn phong
       vec3 halfDir = normalize(lightDir + viewDir);
       float specAngle = max(dot(halfDir, ecNormal), 0.0);
       specular = pow(specAngle, 16.0);
    }
    //complete phong shader
    gl_FragColor = vec4(ambientMaterial*ambientLightColor[0] +
                      lambertian*diffuseMaterial*directionalLightColor[0] +
                      specular*directionalLightColor[0], 1.0);

    //only ambient
//     gl_FragColor = vec4(ambientMaterial * ambientLightColor[0], 1.0);
    //only diffuse
//     gl_FragColor = vec4(lambertian*diffuseMaterial * directionalLightColor[0], 1.0);
    //only specular
//     gl_FragColor = vec4(specular*specularMaterial, 1.0);

    //Only use, if the phong-method is used
    // vec3 color = phong(ecPosition.xyz, viewDir, ecNormal);
    // gl_FragColor = vec4(color, 1.0);

}

//    //1.
//    // get color from different textures
//    //vec3 color = texture2D(textureUniform, texCoord).rgb;
//
//    //2.
//    //normalize normal after projection
//    //3.
//    //do we use a perspective or an orthogonal projection matrix?
//    //bool usePerspective = projectionMatrix[2][3] != 0.0;
//    //for perspective mode, the viewing direction (in eye coords) points
//    //from the vertex to the origin (0,0,0) --> use -ecPosition as direction.
//    //for orthogonal mode, the viewing direction is simply (0,0,1)
//
//    //4.
//    // calculate color using phong illumination
//    // depending on GUI checkbox:
//    // color from night texture and clouds are added to ambient term (instead of ambient material k_a)
//    // color from day texture are added to diffuse term (instead of diffuse material k_d)
//
//    //5.
//    // Note: the texture value might have to get rescaled (gamma corrected)
//    //       e.g. color = pow(color, vec3(0.6))*2.0;
//
//    //6.
//    // vector from light to current point
//    vec3 l = normalize(directionalLightDirection[0]);
//
//    //7.
//    // diffuse contribution
//    vec3 diffuseCoeff = (daytimeTextureBool == 1 )? dayCol : diffuseMaterial;
//    // clouds at day?
//    if(cloudsTextureBool == 1) {
//        diffuseCoeff = (1.0-cloudsCol)*diffuseCoeff + cloudsCol*vec3(1,1,1);
//    }
//    // final diffuse term for daytime
//    vec3 diffuse =  diffuseCoeff * directionalLightColor[0] * ndotl;
//
//    //8.
//    // ambient part contains lights; modify depending on time of day
//    // when ndotl == 1.0 the ambient term should be zero
//
//    // vec3 color = ambient + diffuse + specular;
