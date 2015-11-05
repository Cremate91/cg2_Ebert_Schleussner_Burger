/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: straight_line
 *
 * A StraighLine knows how to draw itself into a specified 2D context,
 * can tell whether a certain mouse position "hits" the object,
 * and implements the function createDraggers() to create a set of
 * draggers to manipulate itself.
 *
 */


/* requireJS module definition */
define(["util", "vec2", "Scene", "PointDragger"],
    (function(util,vec2,Scene,PointDragger) {

        "use strict";

        /**
         *  A simple straight line that can be dragged
         *  around by its endpoints.
         *  Parameters:
         *  - point and radius: array objects representing [x,y] coordinates of start and end point
         *  - pointStyle: object defining width and color attributes for line drawing,
         *       begin of the form { width: 2, color: "#00FF00" }
         */

        var Point = function(point, radius, pointStyle) {
            /*
            console.log("creating straight Point from [" +
            point[0] + "," + point[1] + "] to [" +
            radius + "].");
            */
            // draw pointStyle for drawing the Point
            this.pointStyle = pointStyle || { color: "#0000AA" };

            // initial values in case either point is undefined
            this.center = point || [10,10];
            this.r = radius || 10;

            // draw this Point into the provided 2D rendering context
            this.draw = function(context) {

                // draw actual Point
                context.beginPath();

                // set points to be drawn
                //acr(x, y, radius, startwinkel, endwinkel, uhrzeigersinn)
                context.arc(this.center[0],this.center[1], this.r, 0, 360, false);

                // set drawing pointStyle
                context.fillStyle = this.pointStyle.color;
                context.fill();
                context.strokeStyle = this.pointStyle.color;

                // actually start drawing
                context.stroke();

            };
            
            // test whether the mouse position is on this Point segment
            this.isHit = function(context,mousePosition) {

                var pos = this.center;
                //console.log("pos : [" + pos[0] + ", " + pos[1] + "];");

                var dx = mousePosition[0] - pos[0];
                var dy = mousePosition[1] - pos[1];
                var rad = radius;

                return (dx*dx + dy*dy) <= (rad*rad);

            };

            // return list of draggers to manipulate this Point
            this.createDraggers = function() {

                var draggerStyle = { radius:4, color: this.pointStyle.color, width:0, fill:true };
                var draggers = [];

                // create closure and callbacks for dragger
                var _Point = this;
                var getP0 = function() { return _Point.center; };
                var setP0 = function(dragEvent) { _Point.center = dragEvent.position; };
                draggers.push( new PointDragger(getP0, setP0, draggerStyle) );

                return draggers;

            };
               

        };

        // this module only exports the constructor for Straigh Point objects
        return Point;

    })); // define

    
