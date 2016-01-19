/* requireJS module definition */
define(["three", "shaders"],
    (function (THREE, Shaders) {

        "use strict";

        var Planet = function () {


            this.root = new THREE.Object3D();

            var loader = new THREE.TextureLoader();
            var topoTexture = loader.load('textures/earth_topography_2048.jpg');
            var dayTexture = loader.load('textures/earth_month04.jpg');
            var nightTexture = loader.load('textures/earth_at_night_2048.jpg');
            var clouds = loader.load('textures/earth_clouds_2048.jpg');

            // load and create required textures

            var scope = this;

            // implement ShaderMaterial using the code from
            // the lecture

            var material = new THREE.ShaderMaterial
            ({
                uniforms: THREE.UniformsUtils.merge([
                    THREE.UniformsLib['lights'],
                    {
                        diffuseMaterial: {type: 'c', value: new THREE.Color(1, 0, 0)},
                        specularMaterial: {type: 'c', value: new THREE.Color(0.7, 0.7, 0.7)},
                        ambientMaterial: {type: 'c', value: new THREE.Color(0.8, 0.2, 0.2)},
                        shininessMaterial: {type: 'f', value: 16.0}
                    }
                ]),
                vertexShader: Shaders.getVertexShader("planet"),
                fragmentShader: Shaders.getFragmentShader("planet"),
                lights: true
            });

            // hint:
            // texture can be assigned only when it is loaded completely, e.g. like this
            //material.uniforms.daytimeTexture.value = dayTexture;
            //should stand one or more daytimeTextures?
            //Is the daytimetexture the representive textures and will be changed in the shader?
            //material.uniforms.nighttimeTexture.value = nightTexture;
            //material.uniforms.topographyTexture.value = topoTexture;
            //material.uniforms.cloudTexture.value = clouds;

            scope.mesh = new THREE.Mesh(new THREE.SphereGeometry(400, 100, 100), material);
            scope.mesh.name = "planet";

            scope.root.add(scope.mesh);


            this.getMesh = function () {
                return this.root;
            };


        }; // constructor

        return Planet;

    })); // define module


