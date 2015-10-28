/* requireJS module definition */
define(["util", "vec2", "Scene", "PointDragger"],
    (function(util,vec2,Scene,PointDragger) {

        "use strict";


        var Circle = function(mittlepunkt, radius, circleStyle) {

            console.log("creating circle from [" +
                mittlepunkt + "," +  radius + "].");

            // draw style for drawing the line
            this.circleStyle = circleStyle || { width: "2", color: "#0000AA" };

            // initial values in case either point is undefined
            this.p = mittlepunkt || [10,10];
            this.r = radius || 20;

            // draw this line into the provided 2D rendering context
            this.draw = function(context) {

                // draw actual line
                context.beginPath();

                // set points to be drawn
                context.arc(this.p[0], this.p[1],   // position
                    this.r,                                   // radius
                    0.0, Math.PI*2,                           // start and end angle
                    true);                                    // clockwise
                context.closePath();

                // set drawing style
                context.lineWidth   = this.circleStyle.width;
                context.strokeStyle = this.circleStyle.color;
                context.fillStyle   = this.circleStyle.color;

                // trigger the actual drawing
                if(this.circleStyle.fill) {
                    context.fill();
                };
                context.stroke();
            };

            // test whether the mouse position is on this line segment
            this.isHit = function (context,mousePos) {

                // what is my current position?
                var pos = this.p;

                // check whether distance between mouse and dragger's center
                // is less or equal ( radius + (line width)/2 )
                var dx = mousePos[0] - pos[0];
                var dy = mousePos[1] - pos[1];
                var rad = this.r+circleStyle.width/2;
                return (dx*dx + dy*dy) <= (rad*rad);

            };

            // return list of draggers to manipulate this circle
            this.createDraggers = function() {

                var draggerStyle = { radius:4, color: this.circleStyle.color, width:0, fill:true }
                var draggers = [];

                // create closure and callbacks for dragger
                var _circle = this;
                var getP0 = function() { return _circle.p; };
                var getR = function() {return [_circle.r+ _circle.p[0], _circle.p[1]];};
                var setP0 = function(dragEvent) { _circle.p = dragEvent.position; };
                var setR = function(dragEvent) { _circle.r = dragEvent.position[0]-_circle.p[0];};
                draggers.push( new PointDragger(getP0, setP0, draggerStyle) );
                draggers.push( new PointDragger(getR, setR, draggerStyle));

                return draggers;

            };


        };

        // this module only exports the constructor for StraightLine objects
        return Circle;

    })); // define