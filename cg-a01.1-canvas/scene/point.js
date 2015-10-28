/* requireJS module definition */
define(["util", "vec2", "Scene", "PointDragger"],
    (function(util,vec2,Scene,PointDragger) {

        "use strict";


        var Point = function(mittlepunkt, radius, pointStyle) {

            console.log("creating circle from [" +
                mittlepunkt + "," +  radius + "].");

            // draw style for drawing the line
            this.pointStyle = pointStyle || { width: "2", color: "#0000AA" };

            // initial values in case either point is undefined
            this.p = mittlepunkt || [10,10];
            this.r = radius || 2;

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
                context.lineWidth   = this.pointStyle.width;
                context.strokeStyle = this.pointStyle.color;
                context.fillStyle   = this.pointStyle.color;

                // trigger the actual drawing
                if(this.pointStyle.fill) {
                    context.fill();
                };
                context.stroke();
                context.fill();
            };

            // test whether the mouse position is on this line segment
            this.isHit = function (context,mousePos) {

                // what is my current position?
                var pos = this.p;

                // check whether distance between mouse and dragger's center
                // is less or equal ( radius + (line width)/2 )
                var dx = mousePos[0] - pos[0];
                var dy = mousePos[1] - pos[1];
                var rad = radius+pointStyle.width/2;
                return (dx*dx + dy*dy) <= (rad*rad);

            };

            // return list of draggers to manipulate this circle
            this.createDraggers = function() {

                var draggerStyle = { radius:4, color: this.pointStyle.color, width:0, fill:true }
                var draggers = [];

                // create closure and callbacks for dragger
                var _point = this;
                var getP0 = function() { return _point.p; };
                var getR = function() { return _point.r; };
                var setP0 = function(dragEvent) { _point.p = dragEvent.position; };
                var setR = function(dragEvent) { _point.r = dragEvent.position; };
                draggers.push( new PointDragger(getP0, setP0, draggerStyle) );
                //draggers.push( new PointDragger(getR, setR, draggerStyle));

                return draggers;

            };


        };

        // this module only exports the constructor for StraightLine objects
        return Point;

    })); // define