/**
 * Created by Phenax on 12.11.2015.
 */

define(["three"],
    (function(THREE) {

        "use strict";

        var Ellipsoid = function (posFunc, config) {

            var uSeg = config.uSeg || 10;
            var vSeg = config.vSeg || 10;
            var scale = config.scale || 400;
            var size = config.size || 20;

            var uMin = 0;
            var uMax = Math.PI * 2;
            var vMin = 0;
            var vMax = Math.PI;

            var color = new THREE.Color();
            var length = (uSeg+1) * (vSeg+1);
            var counter = 0;

            this.positions = new Float32Array(length*3);
            this.colors = new Float32Array(length*3);

            var d = size, d2 = d/2;

            for (var i = 0; i < uSeg + 1; i++) {
                for (var j = 0; j < vSeg + 1; j++) {
                    var u = uMin + i / uSeg * (uMax - uMin);
                    var v = vMin + j / vSeg * (vMax - vMin);
                    var posArr = posFunc(u, v);

                    var x = posArr.x * scale;
                    var y = posArr.y * scale;
                    var z = posArr.z * scale;

                    var xa = x * Math.random() + Math.random() * d - d2;
                    var ya = y * Math.random() + Math.random() * d - d2;
                    var za = z * Math.random() + Math.random() * d - d2;

                    this.positions[counter] = xa;
                    this.positions[counter+1] = ya;
                    this.positions[counter+2] = za;

                    var vx = ( x / scale ) + 0.5;
                    var vy = ( y / scale ) + 0.5;
                    var vz = ( z / scale ) + 0.5;

                    color.setRGB( vx, vy, vz );

                    this.colors[counter] = color.r;
                    this.colors[counter+1] = color.g;
                    this.colors[counter+2] = color.b;
                    counter+=3;
                }
            }

            this.getPositions = function () {
                return this.positions;
            };

            this.getColors = function () {
                return this.colors;
            };


        };

        return Ellipsoid;
    }));