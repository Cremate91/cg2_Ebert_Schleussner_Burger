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
            /*********************/
            // TODO: Index-Array erstellen und somit eine Wireframe-Oberfläche erzeugen
            // var index = 0;
            // index = j + i * (vSeg+1);
            /*********************/
            var length = (uSeg+1) * (vSeg+1);
            var counter = 0;

            this.positions = new Float32Array(length*3);
            this.colors = new Float32Array(length*3);


            for (var i = 0; i < uSeg + 1; i++) {
                for (var j = 0; j < vSeg + 1; j++) {
                    var u = uMin + i / uSeg * (uMax - uMin);
                    var v = vMin + j / vSeg * (vMax - vMin);
                    var posArr = posFunc(u, v);

                    var x = posArr.x * scale;
                    var y = posArr.y * scale;
                    var z = posArr.z * scale;

                    this.positions[counter] = x;
                    this.positions[counter+1] = y;
                    this.positions[counter+2] = z;

                    color.setRGB(1, 0, 0);

                    this.colors[counter] = color.r;
                    this.colors[counter+1] = color.g;
                    this.colors[counter+2] = color.b;
                    counter+=3;
                }
            }
            //console.log(this.positions.length);
            //console.log(counter);

            this.getPositions = function () {
                return this.positions;
            };

            this.getColors = function () {
                return this.colors;
            };

        };

        return ParametricSurface;
    }));

