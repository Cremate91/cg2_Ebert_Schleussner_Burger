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
define(["jquery", "three", "util", "shaders", "BufferGeometry", "random", "band", "parametricSurface", "ellipsoid_withObjFilling",
        "random_Triangle", "robot", "explosion", "planet"],
    (function ($, THREE, util, shaders, BufferGeometry, Random, Band, ParametricSurface, Ellipsoid_withObjFilling,
               Random_Triangle, Robot, Explosion, Planet) {

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

            /**
             *  Lights
             */
            var aLight = new THREE.AmbientLight(0x404040);
            var dlight = new THREE.DirectionalLight(0xffffff, 0.5);
            dlight.name = "dLight";
            dlight.position.set(-1, 0, -0.3).normalize();

            this.addLights = function () {
                scope.scene.add(aLight);
                scope.scene.add(dlight);
            };

            this.removeLights = function () {
                scope.scene.remove(aLight);
                scope.scene.remove(dlight);
            };

            /**
             * Animations per key (EventListener)
             */
            // Add a listener for 'keydown' events. By this listener, all key events will be
            // passed to the function 'onDocumentKeyDown'. There's another event type 'keypress'.
            document.addEventListener("keydown", onDocumentKeyDown, false);
            function onDocumentKeyDown(event) {
                if (scope.currentMesh != undefined) {
                    // Get the key code of the pressed key
                    var keyCode = event.which;
                    var roboto = scope.scene.getObjectByName("robot", true);
                    var nodeLeftArm = scope.scene.getObjectByName("shoulderLeft", true);
                    var nodeLeftEllbow = scope.scene.getObjectByName("armLeftEllbow", true);
                    var nodeRightArm = scope.scene.getObjectByName("shoulderRight", true);
                    var nodeRightEllbow = scope.scene.getObjectByName("armRightEllbow", true);
                    var nodeLeftLeg = scope.scene.getObjectByName("thighJointLeft", true);
                    var nodeRightLeg = scope.scene.getObjectByName("thighJointRight", true);
                    var nodeLeftKnee = scope.scene.getObjectByName("kneeLeft", true);
                    var nodeRightKnee = scope.scene.getObjectByName("kneeRight", true);

                    if (keyCode == 38) {
                        console.log("cursor up");
                        if (roboto) {
                            nodeLeftArm.rotation.x += 0.05;
                            nodeLeftEllbow.rotation.x += 0.05;
                            nodeRightArm.rotation.x -= 0.05;
                            nodeRightEllbow.rotation.x -= 0.05;
                            nodeLeftLeg.rotation.x -= 0.05;
                            nodeRightLeg.rotation.x -= 0.05;
                            nodeLeftKnee.rotation.x += 0.05;
                            nodeRightKnee.rotation.x += 0.05;

                            roboto.translateZ(10);


                        } else {
                            scope.currentMesh.rotation.x += 0.05;
                        }
                        // Cursor down
                    } else if (keyCode == 40) {
                        if (roboto) {
                            nodeLeftArm.rotation.x -= 0.05;
                            nodeLeftEllbow.rotation.x -= 0.05;
                            nodeRightArm.rotation.x += 0.05;
                            nodeRightEllbow.rotation.x += 0.05;
                            nodeLeftLeg.rotation.x += 0.05;
                            nodeRightLeg.rotation.x += 0.05;
                            nodeLeftKnee.rotation.x -= 0.05;
                            nodeRightKnee.rotation.x -= 0.05;
                            roboto.translateZ(-10);


                        } else {
                            scope.currentMesh.rotation.x += 0.05;
                        }
                        // Cursor left
                    } else if (keyCode == 37) {
                        if (roboto) {
                            nodeLeftArm.rotation.y -= 0.05;
                            nodeLeftEllbow.rotation.y -= 0.05;
                            nodeRightArm.rotation.y += 0.05;
                            nodeRightEllbow.rotation.y += 0.05;
                            nodeLeftLeg.rotation.y += 0.05;
                            nodeRightLeg.rotation.y += 0.05;
                            nodeLeftKnee.rotation.y -= 0.05;
                            nodeRightKnee.rotation.y -= 0.05;
                            roboto.translateX(10);


                        } else {
                            scope.currentMesh.rotation.y += 0.05;
                        }
                        // Cursor right
                    } else if (keyCode == 39) {
                        if (roboto) {
                            nodeLeftArm.rotation.y += 0.05;
                            nodeLeftEllbow.rotation.y += 0.05;
                            nodeRightArm.rotation.y -= 0.05;
                            nodeRightEllbow.rotation.y -= 0.05;
                            nodeLeftLeg.rotation.y -= 0.05;
                            nodeRightLeg.rotation.y -= 0.05;
                            nodeLeftKnee.rotation.y += 0.05;
                            nodeRightKnee.rotation.y += 0.05;
                            roboto.translateX(-10);

                        } else {
                            scope.currentMesh.rotation.y += 0.05;
                        }
                        // Cursor up
                    }
                } else {
                    console.log("I don´t have an obj!");
                }

            };

            /**
             * Animations per Checkbox
             */
            var pos = false;
            var t = 0;
            this.letAnim = function (anim) {
                if (scope.currentMesh != undefined) {

                    /**
                     *  Objects in the scene
                     */
                    //Robot-Obj
                    var roboto = scope.scene.getObjectByName("robot", true);
                    //Planet-Obj
                    var p = scope.scene.getObjectByName("planet", true);

                    if (roboto) {
                        //console.log(roboto.position.x);

                        var nodeLeftEllbow = scope.scene.getObjectByName("armLeftEllbow", true);
                        var nodeRightEllbow = scope.scene.getObjectByName("armRightEllbow", true);
                        var nodeLeftLeg = scope.scene.getObjectByName("thighJointLeft", true);
                        var torso = scope.scene.getObjectByName("torso", true);

                        if (pos) {
                            roboto.position.x += 10;
                            nodeLeftEllbow.rotation.x += 0.02;
                            nodeRightEllbow.rotation.x -= 0.02;
                            nodeLeftLeg.rotation.x += 0.01;
                            //torso.scaleX(50);
                            if (roboto.position.x == 500) {
                                pos = false;
                            }
                        } else {
                            roboto.position.x -= 10;
                            nodeLeftEllbow.rotation.x -= 0.02;
                            nodeRightEllbow.rotation.x += 0.02;
                            nodeLeftLeg.rotation.x -= 0.01;
                            if (roboto.position.x == -500) {
                                pos = true;
                            }
                        }


                    }
                    else if (p) {

                        //DirectionalLight
                        var directionalLight = scope.scene.getObjectByName("dLight", true);
                        //console.log(directionalLight);
                        t += 0.01;
                        if (t == 360) t = 0;

                        //console.log("x : " + Math.sin(directionalLight.position.x));
                        //console.log("z : " + Math.sin(directionalLight.position.z));
                        directionalLight.position.x += Math.sin(t) * 300;
                        directionalLight.position.z += Math.cos(t) * 300;

                    }
                    else if (anim) {

                        scope.currentMesh.rotation.x += 0.0075;
                        scope.currentMesh.rotation.y += 0.01;

                    }
                } else {
                    console.log("I don´t have an obj!");
                }
            };


            this.textureUpdate = function (d, n, c, t) {
                var day = d || false;
                var night = n || false;
                var clouds = c || false;
                var topo = t || false;
                //console.log("day : " + day);
                //console.log("night : " + night);
                //console.log("clouds : " + clouds);

                var p = scope.scene.getObjectByName("planet", true);

                if (p) {
                    p.material.uniforms.daytimeTextureBool.value = (day) ? 1 : 0;
                    p.material.uniforms.nighttimeTextureBool.value = (night) ? 1 : 0;
                    p.material.uniforms.cloudsTextureBool.value = (clouds) ? 1 : 0;
                }
                this.draw();

            }

            this.addBufferGeometry = function (bufferGeometry) {

                scope.currentMesh = bufferGeometry.getMesh();
                scope.scene.add(scope.currentMesh);

                this.addLights();
            };


            this.removeBufferGeogemtry = function () {
                if (scope.currentMesh != undefined) {
                    scope.scene.remove(scope.currentMesh);
                    this.removeLights();
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

    
