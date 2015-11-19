/**
 * Created by Phenax on 12.11.2015.
 */

definde(["three"],
    (function(THREE) {

        "use strict";

        var Ellipsoid = function(multiplier, config){
            this.xMul = multiplier.x;
            this.yMul = multiplier.y;
            this.zMul = multiplier.z;

            var segments = config.segments || 100;
            var radius = config.radius || 300;
            var height = config.height || 100;

            this.positions = new Float32Array( 2*segments * 3);
            this.colors = new Float32Array( 2*segments * 3 );

            var color = new THREE.Color();

            /* ////////////////////////////////////////
            TODO: for-Schleife basteln, die die Geometrieberechnungen ausführt
             ///////////////////////////////////////// */

        };

        return Ellipsoid;
    }));