/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: Random
 *
 * Generates a random set of points
 * inspired by http://threejs.org/examples/#webgl_interactive_buffergeometry
 */

/* requireJS module definition */
define(["three"],
    (function (THREE) {

        "use strict";

        /**
         *
         * @param scene  - reference to the scene
         * @constructor
         */
        var Band = function (config) {

            var segments = config.segments || 100;
            var radius = config.radius || 300;
            var height = config.height || 100;

            var length = 2 * segments;

            this.positions = new Float32Array(length*3);
            this.colors = new Float32Array(length*3);
            this.indices = new Uint32Array((length*3 * 2));

            var color = new THREE.Color();
            var index = 0;
            var counter = 0;

            for (var i = 0; i < (segments*2); i++) {

                var t = 0;
                // Y coordinates are simply -height/2 and +height/2
                var y = 0;
                if (counter % 2 == 0) {

                    t = (counter / this.positions.length) * Math.PI * 2;
                    y = height / 2;
                } else {
                    t = ((counter-3) / this.positions.length) * Math.PI * 2;
                    y = -height / 2;
                }
                // X and Z coordinates are on a circle around the origin
                var x = Math.sin(t) * radius;
                var z = Math.cos(t) * radius;

                this.positions[counter    ] = x;
                this.positions[counter + 1] = y;
                this.positions[counter + 2] = z;

                if ( i < segments*2-3 ) {

                    // 1. Dreieck
                    this.indices[index    ] = i;          //p0
                    this.indices[index + 1] = i + 1;      //p1
                    this.indices[index + 2] = i + 2;      //p4
                    // 2. Dreiecindices
                    this.indices[index + 3] = i + 1;      //p1
                    this.indices[index + 4] = i + 3;      //p5
                    this.indices[index + 5] = i + 2;      //p4
                }
                //console.log("index : " + (index));
                //console.log("i : " + (i));
                //console.log("index+1 : " + (index+1));
                //console.log("i+1 : " + (i+1));
                //console.log("index+2 : " + (index+2));
                //console.log("i+2 : " + (i+2));
                //
                //console.log("index+3 : " + (index+3));
                //console.log("i+1 : " + (i+1));
                //console.log("index+4 : " + (index+4));
                //console.log("i+3 : " + (i+3));
                //console.log("index+5 : " + (index+5));
                //console.log("i+2 : " + (i+2));

                color.setRGB(1, 0, 0);

                this.colors[counter] = color.r;
                this.colors[counter + 1] = color.g;
                this.colors[counter + 2] = color.b;
                index += 6;
                counter += 3;
            }
            //console.log("index : " + (index));
            //console.log("i : " + (i));
            //console.log("index+1 : " + (index+1));
            //console.log("i+1 : " + (i+1));
            //console.log("index+2 : " + (index+2));
            //console.log("i+2 : " + (i+2));
            //
            //console.log("index+3 : " + (index+3));
            //console.log("i+1 : " + (i+1));
            //console.log("index+4 : " + (index+4));
            //console.log("i+3 : " + (i+3));
            //console.log("index+5 : " + (index+5));
            //console.log("i+2 : " + (i+2));

            // 1. Dreieck
            //this.indices[index    ] = i;          //p0
            //this.indices[index + 1] = i + 1;      //p1
            //this.indices[index + 2] = 0;      //p4
            //// 2. Dreiecindices
            //this.indices[index + 3] = i + 1;      //p1
            //this.indices[index + 4] = 1;      //p5
            //this.indices[index + 5] = 0;      //p4


            //letztes fehlende Teil manuell hinzufügen..
            //console.log(index+5);
            //console.log(segments*2+2);
            //console.log(this.indices.length);
            //console.log(this.indices.length-1);
            //console.log(this.indices.length-2);
            //console.log(this.indices[this.indices.length]);
            //console.log(this.indices[this.indices.length-1]);
            //console.log(this.indices[this.indices.length-2]);

            this.getPositions = function () {
                return this.positions;
            };

            this.getIndices = function () {
                return this.indices;
            };

            this.getColors = function () {
                return this.colors;
            };

        };

        return Band;
    }));
    
