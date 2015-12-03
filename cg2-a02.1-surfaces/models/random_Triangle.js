/**
 * Created by Phenax on 25.11.2015.
 */
define(["three"],
    (function(THREE) {

        "use strict";

        /**
         *
         * @param scene  - reference to the scene
         * @constructor
         */
        var Random_Triangle = function (numItems, triangleSize) {

            var items = numItems || 5000;
            var size = triangleSize || 100;

            this.positions = new Float32Array( items * 3);
            this.normals = new Float32Array( items * 3);
            this.colors = new Float32Array( items * 3 );

            var color = new THREE.Color();

            var n = 800, n2 = n/2;	// triangles spread in the cube
            var d = size, d2 = d/2;	// individual triangle size

            var pA = new THREE.Vector3();
            var pB = new THREE.Vector3();
            var pC = new THREE.Vector3();

            var cb = new THREE.Vector3();
            var ab = new THREE.Vector3();

            for ( var i = 0; i < this.positions.length; i += 9 ) {

                var x = Math.random() * n - n2;
                var y = Math.random() * n - n2;
                var z = Math.random() * n - n2;

                var ax = x + Math.random() * d - d2;
                var ay = y + Math.random() * d - d2;
                var az = z + Math.random() * d - d2;
                var bx = x + Math.random() * d - d2;
                var by = y + Math.random() * d - d2;
                var bz = z + Math.random() * d - d2;
                var cx = x + Math.random() * d - d2;
                var cy = y + Math.random() * d - d2;
                var cz = z + Math.random() * d - d2;
                //console.log("[" + ax + ", " + ay + ", " + az + "]");

                this.positions[ i ]     = ax;
                this.positions[ i + 1 ] = ay;
                this.positions[ i + 2 ] = az;
                this.positions[ i + 3 ] = bx;
                this.positions[ i + 4 ] = by;
                this.positions[ i + 5 ] = bz;
                this.positions[ i + 6 ] = cx;
                this.positions[ i + 7 ] = cy;
                this.positions[ i + 8 ] = cz;

                // flat face normals

                pA.set( ax, ay, az );
                pB.set( bx, by, bz );
                pC.set( cx, cy, cz );

                cb.subVectors( pC, pB );
                ab.subVectors( pA, pB );
                cb.cross( ab );

                cb.normalize();

                var nx = cb.x;
                var ny = cb.y;
                var nz = cb.z;

                this.normals[ i ]     = nx;
                this.normals[ i + 1 ] = ny;
                this.normals[ i + 2 ] = nz;

                this.normals[ i + 3 ] = nx;
                this.normals[ i + 4 ] = ny;
                this.normals[ i + 5 ] = nz;

                this.normals[ i + 6 ] = nx;
                this.normals[ i + 7 ] = ny;
                this.normals[ i + 8 ] = nz;

                // colors

                var vx = ( x / n ) + 0.5;
                var vy = ( y / n ) + 0.5;
                var vz = ( z / n ) + 0.5;

                color.setRGB( vx, vy, vz );

                this.colors[ i ]     = color.r;
                this.colors[ i + 1 ] = color.g;
                this.colors[ i + 2 ] = color.b;
                this.colors[ i + 3 ] = color.r;
                this.colors[ i + 4 ] = color.g;
                this.colors[ i + 5 ] = color.b;
                this.colors[ i + 6 ] = color.r;
                this.colors[ i + 7 ] = color.g;
                this.colors[ i + 8 ] = color.b;

            }

            this.getPositions = function() {
                return this.positions;
            };
            this.getNormals = function() {
                return this.normals;
            };
            this.getColors = function() {
                return this.colors;
            };

        };

        return Random_Triangle;
    }));



