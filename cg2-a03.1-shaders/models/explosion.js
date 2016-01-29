/* requireJS module definition */
define(["jquery", "three", "shaders"],
    (function ($, THREE, Shaders) {

        "use strict";

        var Explosion = function (freqScale, colScale, weight) {


            this.root = new THREE.Object3D();

            var scope = this;


            var loader = new THREE.TextureLoader();
            var exploTexture = loader.load('textures/explosion.png',
                function (texture) {  //success
                    return texture
                },
                function (xhr) {      //loaded
                    console.log((xhr.loaded / xhr.total * 100) + " % loaded");
                },
                function (xhr) {      //error
                    console.log("An error happened..");
                }
            );


            var material = new THREE.ShaderMaterial({
                    uniforms: {
                        explosionTex: {type: 't', value: exploTexture},
                        time: {type: 'f', value: 0.0},
                        weight: {type: 'f', value: weight, needsUpdate: true},
                        freqScale: {type: 'f', value: freqScale, needsUpdate: true},
                        colorScale: {type: 'f', value: colScale, needsUpdate: true}
                    },
                    vertexShader: Shaders.getVertexShader("explosion"),
                    fragmentShader: Shaders.getFragmentShader("explosion")
                }
            );


            scope.mesh = new THREE.Mesh(new THREE.SphereGeometry(300, 50, 50), material);
            scope.mesh.name = "explosion";
            scope.root.add(scope.mesh);


            this.getMesh = function () {
                return this.root;
            };


        }; // constructor


        return Explosion;

    })); // define module

