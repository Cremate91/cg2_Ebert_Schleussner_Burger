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
uniform sampler2D daytimeTexture;
uniform sampler2D nighttimeTexture;
uniform sampler2D topographyTexture;
uniform sampler2D cloudTexture;

// three js only supports int no bool
// if you want a boolean value in the shader, use int
uniform int daytimeTextureBool;
uniform int nighttimeTextureBool;
uniform int cloudsTextureBool;

//meins
////////////////////////////////////////////////////////////////////////////////////////
/*// data from the vertex shader
varying vec3 ecPosition; //vec3
varying vec3 ecNormal; //normalized
varying vec2 vUv;
varying vec3 viewDir;

void main() {
    vec3 v = normalize(viewDir);

    vec3 dayCol = texture2D(daytimeTexture,vUv).rgb;
    vec3 nightCol = texture2D(nighttimeTexture,vUv).rgb;
    vec3 topoCol = texture2D(topographyTexture,vUv).rgb;
    vec3 cloudsCol = texture2D(cloudTexture,vUv).rgb;
    vec3 toLight = normalize(directionalLightDirection[0] - ecPosition);
    //Lambert
    float ndots = max(dot(toLight,ecNormal), 0.0);
    float phong = 0.0;
    //Phong
    if(ndots > 0.0) {
       //without blinn phong
//       vec3 reflectDir = reflect(-toLight, ecNormal);
//       float specAngle = max(dot(reflectDir, viewDir), 0.0);
       //with blinn phong
       vec3 halfDir = normalize(toLight + v);
       float specAngle = max(dot(halfDir, ecNormal), 0.0);

       phong = pow(specAngle, shininessMaterial);
    }
    vec3 ambient, diffuse, specular;
    for(int i = 0; i < MAX_DIR_LIGHTS; i++){
        diffuse += ndots * directionalLightColor[i];
        specular += phong * directionalLightColor[i];
    }

    vec3 l = normalize(directionalLightDirection[0]);
    float ndotl = max( dot(l, ecNormal), 0.0 );
//    diffuse  = diffuse*ndotl;

    ambient  *= ambientLightColor[0];
    ambient  *= (nighttimeTextureBool == 1 && cloudsTextureBool == 0)? nightCol : ambientMaterial;
    ambient  *= (cloudsTextureBool == 1 && nighttimeTextureBool == 0)? cloudsCol: ambientMaterial;
    ambient  *= (cloudsTextureBool == 1 && nighttimeTextureBool == 1)? nightCol*cloudsCol: vec3(1,1,1);

    diffuse  = (daytimeTextureBool == 1)? diffuse*ndotl+dayCol : diffuse*diffuseMaterial;

    specular = specularMaterial * phong * directionalLightColor[0];

    vec3 color = ambient + diffuse + specular;
//    vec3 color = ambient;
//    vec3 color = diffuse;
//    vec3 color = specular;

//    color = pow(color, vec3(0.6))*2.0;
    gl_FragColor = vec4(color, 1.0);
//    gl_FragColor = vec4(vec3(daytimeTextureBool, daytimeTextureBool, daytimeTextureBool) , 1.0);
}
////////////////////////////////////////////////////////////////////////////////////////
*/
//meins Ende


////////////////////////////////////////////////////////////////////////////////////////
// data from the vertex shader
varying vec4 ecPosition;
varying vec3 ecNormal;
varying vec2 vUv;
//varying vec3 viewDir;
varying mat4 projectionMat;
varying mat4 normalMat;

void main(){
    bool usePerspective = projectionMat[2][3] != 0.0;
    vec3 viewDir = usePerspective ? vec3(0, 0, 1) : normalize(-ecPosition.xyz);

    vec3 normal = normalize(ecNormal);

    vec3 dayCol    = texture2D(daytimeTexture, vUv).rgb;
    vec3 nightCol  = texture2D(nighttimeTexture, vUv).rgb;
    vec3 cloudsCol = texture2D(cloudTexture, vUv).rgb;

    if(dot(viewDir, normal) < 0.0){
        gl_FragColor = vec4(vec3(0,0,0), 1.0); // back-face
    } else {
        vec3 ambient, diffuse, specular;

//        vec3 toLight = normalize(directionalLightDirection[0] - ecPosition.xyz);
//        vec3 reflectLight = reflect(-toLight, normal);
        vec3 reflectLight = reflect(-directionalLightDirection[0], normal);
        float ndots = max( dot(directionalLightDirection[0],normal), 0.0);
        //normal phong
        float rdotv = max( dot(reflectLight, viewDir), 0.0);
        //blinn phong
        vec3 h = (viewDir + directionalLightDirection[0]) / abs( (viewDir + directionalLightDirection[0]) );
        float ndoth = max( dot(h, normal), 0.0 );

        vec3 diffuseCoeff;
        if(daytimeTextureBool == 1) {
            ambient = ambientLightColor[0];
            diffuseCoeff = dayCol;
            // clouds at day?
            if(cloudsTextureBool == 1 && nighttimeTextureBool == 0) {
                ambient = cloudsCol * ambientLightColor[0];
                diffuseCoeff = (1.0-cloudsCol)*diffuseCoeff + cloudsCol*vec3(1,1,1);
            }
            if(nighttimeTextureBool == 1 && cloudsTextureBool == 0){
                ambient = nightCol * ambientLightColor[0];
            }
            if(nighttimeTextureBool == 1 && cloudsTextureBool == 1){
                ambient = nightCol * cloudsCol * ambientLightColor[0];
                diffuseCoeff = (1.0-cloudsCol)*diffuseCoeff + cloudsCol*vec3(1,1,1);
            }
        } else {
            ambient = ambientMaterial * ambientLightColor[0];
            diffuseCoeff = diffuseMaterial;
        }

        vec3 l = normalize(directionalLightDirection[0]);
        float ndotl = max( dot(l, normal), 0.0 );
//        ambient = (ndotl == 1.0)? vec3(0,0,0) : ambient;
        // final diffuse term for daytime
        diffuse = diffuseCoeff * ndotl * directionalLightColor[0];
        specular = specularMaterial * pow( rdotv, shininessMaterial ) * directionalLightColor[0];

        diffuse = pow(diffuse, vec3(0.6))*2.0;

        vec3 color = ambient + diffuse + specular;
        gl_FragColor = vec4(color, 1.0);
    }
}
////////////////////////////////////////////////////////////////////////////////////////





























////    // diffuse contribution
////    vec3 diffuseCoeff = (daytimeTextureBool == 1)? dayCol : diffuseMaterial;
////    // clouds at day?
////    if(cloudsTextureBool == 1) {
////        diffuseCoeff = (1.0-cloudsCol)*diffuseCoeff + cloudsCol*vec3(1,1,1);
////    }

////    vec3 l = normalize(directionalLightDirection[0]);
////    float ndotl = max( dot(l, ecNormal), 0.0 );

//    // final diffuse term for daytime
////    diffuse =  diffuse * diffuseCoeff * ndotl;

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
