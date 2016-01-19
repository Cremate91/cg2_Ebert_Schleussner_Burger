/**
 * Created by Burger, Ebert, Schleußner on 16.12.2015.
 */
define(["three", "BufferGeometry", "parametricSurface"],
    (function (THREE, BufferGeometry, ParametricSurface) {

            "use strict";
            var Robot = function () {

                /* Definition Oberklasse-Körperteil*/

                var torsoSize = [250, 400, 150];
                var armSize = [torsoSize[0] / 6, torsoSize[1] / 3 * 2, torsoSize[2] / 2];
                var legSize = [torsoSize[0] / 4, torsoSize[1] / 3 * 2, torsoSize[2] / 2];
                var shoulderSize = [armSize[0] / 2, armSize[0], armSize[2]];


                /* Definition expliziter Körpertiele */
                this.root = new THREE.Object3D();
                this.root.name = "robot";

                this.head = new THREE.Object3D();
                this.head.name = "head";
                this.head.translateY(shoulderSize[2]*1.5);

                this.torso = new THREE.Object3D();
                this.torso.name = "torso";
                this.torso.add(this.head);

                this.neck = new THREE.Object3D();
                this.neck.name = "neck";
                this.neck.translateY(torsoSize[1] / 2);

                this.shoulderLeft = new THREE.Object3D();
                this.shoulderLeft.name = "shoulderLeft";
                this.shoulderLeft.translateX(torsoSize[0] / 2);
                this.shoulderLeft.translateY(armSize[1] / 2, 5);
                this.shoulderLeft.rotateX(Math.PI / 4);

                this.obArmLeft = new THREE.Object3D();
                this.obArmLeft.name = "obArmLeft";
                this.obArmLeft.translateX(armSize[0]);
                this.obArmLeft.translateY(shoulderSize[1]);

                this.armLeftEllbow = new THREE.Object3D();
                this.armLeftEllbow.name = "armLeftEllbow";
                this.armLeftEllbow.translateX(armSize[0]-40);
                this.armLeftEllbow.translateY(shoulderSize[1]+50);

                this.uArmLeft = new THREE.Object3D();
                this.uArmLeft.name = "uArmLeft";
                this.uArmLeft.translateY(armSize[1]/2-50);

                this.leftHand = new THREE.Object3D();
                this.leftHand.name = "leftHand";
                this.leftHand.translateY(armSize[1]/2-80);

                this.shoulderRight = new THREE.Object3D();
                this.shoulderRight.name = "shoulderRight";
                this.shoulderRight.translateX((torsoSize[0] / 2) * -1);
                this.shoulderRight.translateY(armSize[1] / 2, 5);
                this.shoulderRight.rotateX(Math.PI / 4);

                this.obArmRight = new THREE.Object3D();
                this.obArmRight.name = "obArmRight";
                this.obArmRight.translateX(armSize[0] * -1);
                this.obArmRight.translateY(shoulderSize[1]);

                this.armRightEllbow = new THREE.Object3D();
                this.armRightEllbow.name = "armRightEllbow";
                this.armRightEllbow.translateX(armSize[0]-40);
                this.armRightEllbow.translateY(shoulderSize[1]+50);

                this.uArmRight = new THREE.Object3D();
                this.uArmRight.name = "uArmRight";
                this.uArmRight.translateY(armSize[1]/2-50);

                this.rightHand = new THREE.Object3D();
                this.rightHand.name = "leftHand";
                this.rightHand.translateY(armSize[1]/2-80);

                this.thighJointLeft = new THREE.Object3D();
                this.thighJointLeft.name = "thighJointLeft";
                this.thighJointLeft.translateX(torsoSize[0]/2-30);
                this.thighJointLeft.translateY(-legSize[1]+30);

                this.thighJointRight = new THREE.Object3D();
                this.thighJointRight.name = "thighJointRight";
                this.thighJointRight.translateX(-torsoSize[0]/2+30);
                this.thighJointRight.translateY(-legSize[1]+30);

                this.thighLeft = new THREE.Object3D();
                this.thighLeft.name = "thighLeft";
                this.thighLeft.translateX(legSize[0]-60);
                this.thighLeft.translateY(-legSize[2]/2 -30);

                this.thighRight = new THREE.Object3D();
                this.thighRight.name = "thighRight";
                this.thighRight.translateX(legSize[0]-60);
                this.thighRight.translateY(-legSize[2]/2 -30);

                this.kneeLeft = new THREE.Object3D();
                this.kneeLeft.name = "kneeLeft";
                this.kneeLeft.translateX(-legSize[0]+60);
                this.kneeLeft.translateY(-legSize[2]/2-60);

                this.kneeRight = new THREE.Object3D();
                this.kneeRight.name = "kneeRight";
                this.kneeRight.translateX(-legSize[0]+60);
                this.kneeRight.translateY(-legSize[2]/2-60);

                this.lowerLegLeft = new THREE.Object3D();
                this.lowerLegLeft.name = "thighLeft";
                this.lowerLegLeft.translateY(-legSize[1]/2+50);

                this.lowerLegRight = new THREE.Object3D();
                this.lowerLegRight.name = "lowerLegRight";
                this.lowerLegRight.translateY(-legSize[1]/2+50);

                this.footLeft = new THREE.Object3D();
                this.footLeft.name = "footLeft";
                this.footLeft.translateY((legSize[1] / 6) * -1);
                this.footLeft.translateZ(legSize[2] / 1.5);
                this.footLeft.rotateX(Math.PI / 2);

                this.footRight = new THREE.Object3D();
                this.footRight.name = "footRight";
                this.footRight.translateY((legSize[1] / 6) * -1);
                this.footRight.translateZ(legSize[2] / 1.5);
                this.footRight.rotateX(Math.PI / 2);

                /**  Szenengraph **/
                this.uArmLeft.add(this.leftHand);
                this.shoulderLeft.add(this.obArmLeft);
                this.obArmLeft.add(this.armLeftEllbow);
                this.armLeftEllbow.add(this.uArmLeft);
                this.uArmRight.add(this.rightHand);
                this.obArmRight.add(this.armRightEllbow);
                this.shoulderRight.add(this.obArmRight);
                this.armRightEllbow.add(this.uArmRight);
                this.thighJointLeft.add(this.thighLeft);
                this.thighJointRight.add(this.thighRight);
                this.thighLeft.add(this.kneeLeft);
                this.thighRight.add(this.kneeRight);
                this.kneeLeft.add(this.lowerLegLeft);
                this.kneeRight.add(this.lowerLegRight);
                this.lowerLegRight.add(this.footRight);
                this.lowerLegLeft.add(this.footLeft);
                this.neck.add(this.head);
                this.torso.add(this.neck);
                this.torso.add(this.thighJointLeft);
                this.torso.add(this.thighJointRight);
                this.torso.add(this.shoulderLeft);
                this.torso.add(this.shoulderRight);


                /**Parametrische Figuren**/
                var sphere = function (u, v) {
                    return {
                        x: Math.cos(u) * Math.sin(v),
                        y: Math.sin(u) * Math.sin(v),
                        z: Math.cos(v)
                    };
                };


                var configHead = {
                    segments: 25,
                    uSeg: 25,
                    vSeg: 25,
                    uMin: -Math.PI/2,
                    uMax: Math.PI/2,
                    vMin: -Math.PI,
                    vMax: Math.PI,
                    scale: 100
                };

                var configHand = {
                    segments: 25,
                    uSeg: 25,
                    vSeg: 25,
                    uMin: -Math.PI/2,
                    uMax: Math.PI/2,
                    vMin: -Math.PI,
                    vMax: Math.PI,
                    scale: 50
                };


                var head = new ParametricSurface(sphere, configHead);
                var headBufferGeo = new BufferGeometry(false, false, false, false, true);
                headBufferGeo.addAttribute("position", head.getPositions());
                headBufferGeo.addAttribute("color", head.getColors());
                headBufferGeo.setIndex(head.getIndices());

                var configEllbow = {
                    segments: 25,
                    uSeg: 25,
                    vSeg: 25,
                    uMin: -Math.PI/2,
                    uMax: Math.PI/2,
                    vMin: -Math.PI,
                    vMax: Math.PI,
                    scale: 40
                };

                var ellbowLeft = new ParametricSurface(sphere, configEllbow);
                var ellbowLeftBufferGeo = new BufferGeometry(false, false, false, false, true);
                ellbowLeftBufferGeo.addAttribute("position", ellbowLeft.getPositions());
                ellbowLeftBufferGeo.addAttribute("color", ellbowLeft.getColors());
                ellbowLeftBufferGeo.setIndex(ellbowLeft.getIndices());

                var ellbowRight = new ParametricSurface(sphere, configEllbow);
                var ellbowRightBufferGeo = new BufferGeometry(false, false, false, false, true);
                ellbowRightBufferGeo.addAttribute("position", ellbowRight.getPositions());
                ellbowRightBufferGeo.addAttribute("color", ellbowRight.getColors());
                ellbowRightBufferGeo.setIndex(ellbowRight.getIndices());

                var leftHand = new ParametricSurface(sphere, configHand);
                var leftHandBufferGeo = new BufferGeometry(false, false, false, false, true);
                leftHandBufferGeo.addAttribute("position", leftHand.getPositions());
                leftHandBufferGeo.addAttribute("color", leftHand.getColors());
                leftHandBufferGeo.setIndex(leftHand.getIndices());

                var rightHand = new ParametricSurface(sphere, configHand);
                var rightHandBufferGeo = new BufferGeometry(false, false, false, false, true);
                rightHandBufferGeo.addAttribute("position", rightHand.getPositions());
                rightHandBufferGeo.addAttribute("color", rightHand.getColors());
                rightHandBufferGeo.setIndex(leftHand.getIndices());

                var thighJointLeft = new ParametricSurface(sphere, configEllbow);
                var thighJointLefBuffertGeo = new BufferGeometry(false, false, false, false, true);
                thighJointLefBuffertGeo.addAttribute("position", thighJointLeft.getPositions());
                thighJointLefBuffertGeo.addAttribute("color", thighJointLeft.getColors());
                thighJointLefBuffertGeo.setIndex(thighJointLeft.getIndices());

                var thighJointRight = new ParametricSurface(sphere, configEllbow);
                var thighJointRightBufferGeo = new BufferGeometry(false, false, false, false, true);
                thighJointRightBufferGeo.addAttribute("position", thighJointRight.getPositions());
                thighJointRightBufferGeo.addAttribute("color", thighJointRight.getColors());
                thighJointRightBufferGeo.setIndex(thighJointRight.getIndices());

                var kneeLeft = new ParametricSurface(sphere, configEllbow);
                var kneeLefttBufferGeo = new BufferGeometry(false, false, false, false, true);
                kneeLefttBufferGeo.addAttribute("position", kneeLeft.getPositions());
                kneeLefttBufferGeo.addAttribute("color", kneeLeft.getColors());
                kneeLefttBufferGeo.setIndex(kneeLeft.getIndices());

                var kneeRight = new ParametricSurface(sphere, configEllbow);
                var kneeRightBufferGeo = new BufferGeometry(false, false, false, false, true);
                kneeRightBufferGeo.addAttribute("position", kneeRight.getPositions());
                kneeRightBufferGeo.addAttribute("color", kneeRight.getColors());
                kneeRightBufferGeo.setIndex(kneeRight.getIndices());






                /**Skinning**/
                this.headSkin = headBufferGeo.getMesh();
                //this.headSkin = new THREE.Mesh(new THREE.CubeGeometry(headSize[0], headSize[1], headSize[2]), new THREE.MeshNormalMaterial());
                //this.headSkin.rotateY(Math.PI / 4);

                this.torsoSkin = new THREE.Mesh(new THREE.CubeGeometry(torsoSize[0], torsoSize[1], torsoSize[2]), new THREE.MeshNormalMaterial());

                this.shoulderLeftSkin = new THREE.Mesh(new THREE.CylinderGeometry(shoulderSize[0] * 2, shoulderSize[0] * 2, shoulderSize[1], 32), new THREE.MeshNormalMaterial());
                this.shoulderLeftSkin.rotateZ(Math.PI / 2);

                this.shoulderRightSkin = new THREE.Mesh(new THREE.CylinderGeometry(shoulderSize[0] * 2, shoulderSize[0] * 2, shoulderSize[1], 32), new THREE.MeshNormalMaterial());
                this.shoulderRightSkin.rotateZ(Math.PI / 2);

                this.obArmLeftSkin = new THREE.Mesh(new THREE.CubeGeometry(armSize[0], armSize[1] / 2, armSize[2]), new THREE.MeshNormalMaterial());

                this.obArmRightSkin = new THREE.Mesh(new THREE.CubeGeometry(armSize[0], armSize[1] / 2, armSize[2]), new THREE.MeshNormalMaterial());

                this.armLeftEllbowSkin = ellbowLeftBufferGeo.getMesh();

                this.armRightEllbowSkin = ellbowRightBufferGeo.getMesh();

                this.uArmRightSkin = new THREE.Mesh(new THREE.CubeGeometry(armSize[0], armSize[1] / 2, armSize[2]), new THREE.MeshNormalMaterial());

                this.uArmLeftSkin = new THREE.Mesh(new THREE.CubeGeometry(armSize[0], armSize[1] / 2, armSize[2]), new THREE.MeshNormalMaterial());

                this.lefthandSkin = leftHandBufferGeo.getMesh();

                this.rightHandSkin = rightHandBufferGeo.getMesh();

                this.thighJointLeftSkin = thighJointLefBuffertGeo.getMesh();

                this.thighJointRightSkin = thighJointRightBufferGeo.getMesh();

                this.thighLeftSkin = new THREE.Mesh(new THREE.CubeGeometry(legSize[0], legSize[1] / 2, legSize[2]), new THREE.MeshNormalMaterial());

                this.thighRightSkin = new THREE.Mesh(new THREE.CubeGeometry(legSize[0], legSize[1] / 2, legSize[2]), new THREE.MeshNormalMaterial());

                this.kneeLeftSkin = kneeLefttBufferGeo.getMesh();

                this.kneeRightSkin = kneeRightBufferGeo.getMesh();

                this.lowerLegLeftSkin = new THREE.Mesh(new THREE.CubeGeometry(legSize[0], legSize[1] / 2, legSize[2]), new THREE.MeshNormalMaterial());

                this.lowerLegRightSkin = new THREE.Mesh(new THREE.CubeGeometry(legSize[0], legSize[1] / 2, legSize[2]), new THREE.MeshNormalMaterial());

                this.footRightSkin = new THREE.Mesh(new THREE.CylinderGeometry(shoulderSize[0], shoulderSize[0] * 1.5, legSize[2], 32), new THREE.MeshNormalMaterial());

                this.footLeftSkin = new THREE.Mesh(new THREE.CylinderGeometry(shoulderSize[0], shoulderSize[0] * 1.5, legSize[2], 32), new THREE.MeshNormalMaterial());

                this.neckSkin = new THREE.Mesh(new THREE.CylinderGeometry(shoulderSize[1], shoulderSize[1], shoulderSize[2], 32));


                this.torso.add(this.torsoSkin);
                this.head.add(this.headSkin);
                this.neck.add(this.neckSkin);
                this.shoulderLeft.add(this.shoulderLeftSkin);
                this.shoulderRight.add(this.shoulderRightSkin);
                this.obArmLeft.add(this.obArmLeftSkin);
                this.obArmRight.add(this.obArmRightSkin);
                this.armLeftEllbow.add(this.armLeftEllbowSkin);
                this.armRightEllbow.add(this.armRightEllbowSkin);
                this.uArmRight.add(this.uArmRightSkin);
                this.uArmLeft.add(this.uArmLeftSkin);
                this.leftHand.add(this.lefthandSkin);
                this.rightHand.add(this.rightHandSkin);
                this.thighJointLeft.add(this.thighJointLeftSkin);
                this.thighJointRight.add(this.thighJointRightSkin);
                this.thighLeft.add(this.thighLeftSkin);
                this.thighRight.add(this.thighRightSkin);
                this.kneeLeft.add(this.kneeLeftSkin);
                this.kneeRight.add(this.kneeRightSkin);
                this.lowerLegLeft.add(this.lowerLegLeftSkin);
                this.lowerLegRight.add(this.lowerLegRightSkin);
                this.footRight.add(this.footRightSkin);
                this.footLeft.add(this.footLeftSkin);
                this.root.add(this.torso);

                this.getMesh = function () {
                    return this.root;
                };
            };
            return Robot;
        }
    ));
