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
uniform int topoTextureBool;

// data from the vertex shader
varying vec4 ecPosition;
varying vec3 ecNormal;
varying vec2 vUv;
varying mat4 projectionMat;

void main(){
    bool usePerspective = projectionMat[2][3] != 0.0;
    vec3 viewDir = usePerspective ? vec3(0, 0, 1) : normalize(-ecPosition.xyz);

    vec3 normal = normalize(ecNormal);

    vec3 dayCol    = texture2D(daytimeTexture, vUv).rgb;
    vec3 nightCol  = texture2D(nighttimeTexture, vUv).rgb;
    vec3 cloudsCol = texture2D(cloudTexture, vUv).rgb;
    vec3 topoCol   = texture2D(topographyTexture, vUv).rgb;

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

        vec3 l = normalize(directionalLightDirection[0]);
        float ndotl = max( dot(l, normal), 0.0 );


        vec3 diffuseCoeff;
        if(daytimeTextureBool == 1) {
            diffuseCoeff = dayCol;
            // clouds at day?
            if(nighttimeTextureBool == 0 && cloudsTextureBool == 1) {
                ambient = cloudsCol;
                diffuseCoeff = (1.0-cloudsCol)*diffuseCoeff + cloudsCol*vec3(1,1,1);
            }
            if(nighttimeTextureBool == 1 && cloudsTextureBool == 0){
                ambient = nightCol;
//                ambient = (ndotl == 1.0)? vec3(0,0,0) : ambient+nightCol;
            }
            if(nighttimeTextureBool == 1 && cloudsTextureBool == 1){
//                ambient = nightCol * cloudsCol;
                ambient = (ndotl == 1.0)? vec3(0,0,0) : nightCol*cloudsCol;
                diffuseCoeff = (1.0-cloudsCol)*diffuseCoeff + cloudsCol*vec3(1,1,1);
            }
            if(nighttimeTextureBool == 0 && cloudsTextureBool == 0 && topoTextureBool == 1){
//                ambient = (ndotl == 1.0)? vec3(0,0,0) : topoCol;
//                ambient = (ndotl == 1.0)? vec3(0,0,0) : dayCol;
                diffuseCoeff = topoCol;
            }
//            ambient = (ndotl == 1.0)? vec3(0,0,0) : ambient;
            ambient = (1.0-ndotl) * ambient;
        } else {
            ambient      = ambientMaterial;
            diffuseCoeff = diffuseMaterial;
        }



        // final diffuse term for daytime
        diffuse = diffuseCoeff * ndotl;

        float phong = pow( rdotv, shininessMaterial );
        float blinnphong = pow( ndoth, shininessMaterial );
        specular = specularMaterial  * phong;
//        specular = specularMaterial  * blinnphong;

        ambient *= pow(ambient, vec3(0.6))*2.0;
        diffuse  = pow(diffuse, vec3(0.6))*2.0;
        specular = pow(specular, vec3(0.6))*2.0;

        vec3 color = ambient * ambientLightColor[0]
            + diffuse  * directionalLightColor[0]
            + specular * directionalLightColor[0];


        gl_FragColor = vec4(color, 1.0);
    }
}
////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////von Hildebrand
//precision mediump float;
//
//
//// uniform lights (we only have the sun)
//uniform vec3 directionalLightColor[1];
//uniform vec3 directionalLightDirection[1];
//
//uniform vec3 ambientLightColor[1];
//
//// uniform material constants k_a, k_d, k_s, alpha
//
//// uniform sampler2D textures
//
//// three js only supports int no bool
//// if you want a boolean value in the shader, use int
//
//// data from the vertex shader
//varying vec4 ecPosition;
//varying vec3 ecNormal;
//varying vec2 vUv;
//
//
//void main() {
//
//
//    // get color from different textures
//    //vec3 color = texture2D(textureUniform, texCoord).rgb;
//
//    // normalize normal after projection
//
//    // do we use a perspective or an orthogonal projection matrix?
//    //bool usePerspective = projectionMatrix[2][3] != 0.0;
//    // for perspective mode, the viewing direction (in eye coords) points
//    // from the vertex to the origin (0,0,0) --> use -ecPosition as direction.
//    // for orthogonal mode, the viewing direction is simply (0,0,1)
//
//    // calculate color using phong illumination
//    // depending on GUI checkbox:
//    // color from night texture and clouds are added to ambient term (instead of ambient material k_a)
//    // color from day texture are added to diffuse term (instead of diffuse material k_d)
//
//    // Note: the texture value might have to get rescaled (gamma corrected)
//    //       e.g. color = pow(color, vec3(0.6))*2.0;
//
//    // vector from light to current point
//    vec3 l = normalize(directionalLightDirection[0]);
//
//
//    // diffuse contribution
//    vec3 diffuseCoeff = (daytimeTextureBool == 1 )? dayCol : diffuseMaterial;
//    // clouds at day?
//    if(cloudsTextureBool == 1) {
//        diffuseCoeff = (1.0-cloudsCol)*diffuseCoeff + cloudsCol*vec3(1,1,1);
//    }
//    // final diffuse term for daytime
//    vec3 diffuse =  diffuseCoeff * directionalLightColor[0] * ndotl;
//
//    // ambient part contains lights; modify depending on time of day
//    // when ndotl == 1.0 the ambient term should be zero
//
//    vec3 color = ambient + diffuse + specular;
//
//    gl_FragColor = vec4(color, 1.0);
//
//}
