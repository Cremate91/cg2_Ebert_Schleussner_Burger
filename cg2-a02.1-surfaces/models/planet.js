/* requireJS module definition */
define(["three", "shaders"],
    (function (THREE, Shaders) {

        "use strict";

        var Planet = function () {


            this.root = new THREE.Object3D();

            // load and create required textures
            var loader = new THREE.TextureLoader();
            var earth_at_night = loader.load('textures/earth_at_night_2048.jpg');

            //console.log(earth_at_night);


            var scope = this;

            // implement ShaderMaterial using the code from
            // the lecture
            var material = new THREE.ShaderMaterial({

                uniforms: THREE.UniformsUtils.merge([
                    THREE.UniformsLib['lights'],
                    {
                        phongDiffuseMaterial: { type: 'c', value: new THREE.Color(1,0,0) },
                        phongSpecularMaterial: { type: 'c', value: new THREE.Color(0.7,0.7,0.7) },
                        phongAmbientMaterial: { type: 'c', value: new THREE.Color(0.8,0.2,0.2) },
                        phongShininessMaterial: { type: 'f', value: 16.0 }
                    }
                ]),
                vertexShader: Shaders.getVertexShader("planet"),
                fragmentShader: Shaders.getFragmentShader("planet"),
                lights: true
            });
            // hint:
            // texture can be assigned only when it is loaded completely, e.g. like this
            //material.uniforms.daytimeTexture.value   = earth_at_nights;


            scope.mesh = new THREE.Mesh(new THREE.SphereGeometry(400, 100, 100), material);
            scope.mesh.name = "planet";

            scope.root.add(scope.mesh);


            this.getMesh = function () {
                return this.root;
            };


        }; // constructor

        return Planet;

    })); // define module


