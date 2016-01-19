/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: ParametricSurface
 *
 */

/* requireJS module definition */
define(["three"],
    (function (THREE) {

        "use strict";

        var ParametricSurface = function (posFunc, config) {

            var uSeg = config.uSeg || 100;
            var vSeg = config.vSeg || 100;
            var uMin = config.uMin || 0;
            var uMax = config.uMax || Math.PI * 2;
            var vMin = config.vMin || 0;
            var vMax = config.vMax || Math.PI;
            var scale = config.scale || 400;

            var color = new THREE.Color();
            var length = (uSeg+1) * (vSeg+1);
            var counter = 0;
            var index = 0;

            this.positions = new Float32Array(length*3);
            //this.normals = new Float32Array(length * 3);
            this.indices = new Uint32Array(length * 3 * 2);
            this.colors = new Float32Array(length*3);

            for (var i = 0; i < uSeg + 1; i++) {
                for (var j = 0; j < vSeg + 1; j++) {

                    var u1 = uMin + i / uSeg * (uMax - uMin);
                    var v1 = vMin + j / vSeg * (vMax - vMin);

                    var posArr1 = posFunc(u1, v1);

                    var x1 = posArr1.x * scale;
                    var y1 = posArr1.y * scale;
                    var z1 = posArr1.z * scale;

                    this.positions[counter] = x1;
                    this.positions[counter+1] = y1;
                    this.positions[counter+2] = z1;

                    if(i < uSeg && j < vSeg){
                        // 1. Dreieck
                        this.indices[index    ] = j + (vSeg+1) * i;             //p0
                        this.indices[index + 1] = j + 1 + (vSeg+1) * i;         //p1
                        this.indices[index + 2] = j + (vSeg+1) * (i + 1);       //p4
                        // 2. Dreieck
                        this.indices[index + 3] = j + 1 + (vSeg+1) * i;         //p1
                        this.indices[index + 4] = j + 1 + (vSeg+1) * (i + 1);   //p5
                        this.indices[index + 5] = j + (vSeg+1) * (i + 1);       //p4
                    }

                    color.setRGB(1, 0, 0);

                    this.colors[counter  ] = color.r;
                    this.colors[counter+1] = color.g;
                    this.colors[counter+2] = color.b;

                    counter+=3;
                    index+=6;
                }
            }
            //console.log(this.positions.length);
            //console.log(counter);

            this.getPositions = function () {
                return this.positions;
            };

            /*this.getNormals = function() {
                return this.normals;
            };*/

            this.getIndices = function() {
                return this.indices;
            };

            this.getColors = function () {
                return this.colors;
            };

        };

        return ParametricSurface;
    }));

