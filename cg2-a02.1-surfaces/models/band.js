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
    (function(THREE) {

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

            this.positions = new Float32Array( 2*segments * 3);
            this.colors = new Float32Array( 2*segments * 3 );
            this.indices = new Uint32Array(segments * 4);

            var color = new THREE.Color();
            var index = 0;

            for(var i=0; i<this.positions.length; i+=6) {

                // X and Z coordinates are on a circle around the origin
                var t = (i/this.positions.length)*Math.PI*2;
                var x = Math.sin(t) * radius;
                var z = Math.cos(t) * radius;
                // Y coordinates are simply -height/2 and +height/2
                var y0 = height/2;
                var y1 = -height/2;
                //console.log("[" + x + ", " + y0 + ", " + z + "] -- [" + x + ", " + y1 + ", " + z + "]");

                // add two points for each position on the circle
                // IMPORTANT: push each float value separately!
                this.positions[ i ]     = x;
                this.positions[ i + 1 ] = y0;
                this.positions[ i + 2 ] = z;

                this.positions[ i + 3 ] = x;
                this.positions[ i + 4 ] = y1;
                this.positions[ i + 5 ] = z;
                console.log("p0 : " + index + ", p1 : " + (index+1) +
                    ", p2 : " + (index+2) + ", p3 : " + (index+3) );

                if(i < this.positions.length-4){

                    // 1. Dreieck
                    this.indices[index    ] = index;        //p0
                    this.indices[index + 1] = index+1;      //p1
                    this.indices[index + 2] = index+2;      //p4
                    // 2. Dreieck
                    this.indices[index + 1] = index+1;      //p1
                    this.indices[index + 3] = index+3;      //p5
                    this.indices[index + 2] = index+2;      //p4

                }

                color.setRGB( 1,0,0 );

                this.colors[ i ]     = color.r;
                this.colors[ i + 1 ] = color.g;
                this.colors[ i + 2 ] = color.b;

                this.colors[ i + 3 ] = color.r;
                this.colors[ i + 4 ] = color.g;
                this.colors[ i + 5 ] = color.b;
                index+=4;
            }

            this.getPositions = function() {
                return this.positions;
            };

            this.getIndices = function() {
                return this.indices;
            };

            this.getColors = function() {
                return this.colors;
            };

        };

        return Band;
    }));
    
