/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: scene
 *
 * A Scene is a depth-sorted collection of things to be drawn, 
 * plus a background fill style.
 *
 */



/* requireJS module definition */
define(["three", "util", "shaders", "BufferGeometry", "random", "band", "parametricSurface", "ellipsoid_withObjFilling", "random_Triangle"],
    (function (THREE, util, shaders, BufferGeometry, Random, Band, ParametricSurface, Ellipsoid_withObjFilling, Random_Triangle) {

        "use strict";

        /*
         * Scene constructor
         */
        var Scene = function (renderer, width, height) {

            // the scope of the object instance
            var scope = this;

            scope.renderer = renderer;
            scope.t = 0.0;
            //perspectiveCamera(cameraöffnungswinkel, aspectRatio, 0.1 = Anfang der Camera, 2000 = Tiefe der Camera)
            scope.camera = new THREE.PerspectiveCamera(66, width / height, 0.1, 2000);
            //z =  Abstand der Camera zum "Anfang der Camera"
            scope.camera.position.z = 1000;
            scope.scene = new THREE.Scene();

            // Add a listener for 'keydown' events. By this listener, all key events will be
            // passed to the function 'onDocumentKeyDown'. There's another event type 'keypress'.
            document.addEventListener("keydown", onDocumentKeyDown, false);


            function onDocumentKeyDown(event) {
                if (scope.currentMesh != undefined) {
                    // Get the key code of the pressed key
                    var keyCode = event.which;

                    if (keyCode == 38) {
                        console.log("cursor up");
                        scope.currentMesh.rotation.x += 0.05;
                        // Cursor down
                    } else if (keyCode == 40) {
                        console.log("cursor down");
                        scope.currentMesh.rotation.x += -0.05;
                        // Cursor left
                    } else if (keyCode == 37) {
                        console.log("cursor left");
                        scope.currentMesh.rotation.y += 0.05;
                        // Cursor right
                    } else if (keyCode == 39) {
                        console.log("cursor right");
                        scope.currentMesh.rotation.y += -0.05;
                        // Cursor up
                    }
                } else {
                    console.log("I don´t have an obj!");
                }

            };

            this.addBufferGeometry = function (bufferGeometry) {

                scope.currentMesh = bufferGeometry.getMesh();
                scope.scene.add(scope.currentMesh);

                this.addLights(true);
            };

            this.addLights = function (lights) {
                if (lights) {
                    scope.scene.add(new THREE.AmbientLight(0xaaaaaa));

                    var light1 = new THREE.DirectionalLight(0xffffff, 0.5);
                    light1.position.set(1, 1, 1);
                    scope.scene.add(light1);

                    var light2 = new THREE.DirectionalLight(0xffffff, 1.5);
                    light2.position.set(0, -1, 0);
                    scope.scene.add(light2);
                }else{
                    //scope.scene.add(new THREE.AmbientLight(0xcccccc));
                }
            };

            this.removeLights = function () {
                scope.scene.add(new THREE.AmbientLight(0x444444));

                var light1 = new THREE.DirectionalLight(0x000000, 0.5);
                light1.position.set(1, 1, 1);
                scope.scene.add(light1);

                var light2 = new THREE.DirectionalLight(0x000000, 1.5);
                light2.position.set(0, -1, 0);
                scope.scene.add(light2);
            };

            this.letAnim = function (anim) {
                if (scope.currentMesh != undefined) {
                    if (anim) {
                        scope.currentMesh.rotation.x += 0.0075;
                        scope.currentMesh.rotation.y += 0.01;
                    }
                } else {
                    console.log("I don´t have an obj!");
                }
            };

            this.removeBufferGeogemtry = function(){
                if (scope.currentMesh != undefined) {
                    scope.scene.remove(scope.currentMesh);
                    this.removeLights(); // das funktionier noch nicht richtig, man merkt es beim wiederholten
                    // erstellen einer Geometrie mit einem Dreickmaterial
                } else {
                    console.log("I don´t have an obj!");
                }
            };

            /*
             * drawing the scene
             */
            this.draw = function () {

                requestAnimFrame(scope.draw);

                scope.renderer.render(scope.scene, scope.camera);

            };
        };


// this module only exports the constructor for Scene objects
        return Scene;

    }))
; // define

    
