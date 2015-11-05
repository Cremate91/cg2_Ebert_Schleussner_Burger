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
         *  - lineStyle: object defining width and color attributes for line drawing,
         *       begin of the form { width: 2, color: "#00FF00" }
         */

        var Circle = function(point, radius, circleStyle) {

            console.log("creating straight Circle from [" +
            point[0] + "," + point[1] + "] to [" +
            radius + "].");

            // draw circleStyle for drawing the Circle
            this.circleStyle = circleStyle || { width: "2", color: "#0000AA" };

            // initial values in case either point is undefined
            this.p = point || [10,10];
            this.r = radius || 10;

            // draw this Circle into the provided 2D rendering context
            this.draw = function(context) {

                // draw actual Circle
                context.beginPath();

                // set points to be drawn
                //acr(x, y, radius, startwinkel, endwinkel, uhrzeigersinn)
                context.arc(this.p[0],this.p[1], this.r, (3)*Math.PI, (1/3)*Math.PI, true);

                // set drawing circleStyle
                context.lineWidth = this.circleStyle.width;
                context.strokeStyle = this.circleStyle.color;

                // actually start drawing
                context.stroke();

            };
            
            // test whether the mouse position is on this Circle segment
            this.isHit = function(context,mousePosition) {

                var pos = this.p;
                //console.log("pos : [" + pos[0] + ", " + pos[1] + "];");

                var dx = mousePosition[0] - pos[0];
                var dy = mousePosition[1] - pos[1];
                var rad = this.r + circleStyle.width/2;

                return (dx*dx + dy*dy) <= (rad*rad);

            };

            // return list of draggers to manipulate this Circle
            this.createDraggers = function() {

                var draggerStyle = { radius:4, color: this.circleStyle.color, width:0, fill:true };
                var draggers = [];

                // create closure and callbacks for dragger
                var _Circle = this;
                var getP0 = function() { return _Circle.p; };
                var getR = function() { return [_Circle.p[0] + _Circle.r, _Circle.p[1]]; };
                var setP0 = function(dragEvent) { _Circle.p = dragEvent.position; };
                var setR = function(dragEvent) { _Circle.r = (dragEvent.position[0]-_Circle.p[0]); };
                draggers.push( new PointDragger(getP0, setP0, draggerStyle) );
                draggers.push( new PointDragger(getR, setR, draggerStyle) );

                return draggers;

            };
               

        };

        // this module only exports the constructor for StraightCircle objects
        return Circle;

    })); // define
