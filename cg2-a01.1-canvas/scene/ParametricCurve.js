/**
 * Created by Phenax on 29.10.2015.
 */

/* requireJS module definition */
define(["util", "vec2", "Scene", "PointDragger"],
    (function(util,vec2,Scene,PointDragger) {



        var ParametricCurve = function(paramCurve, lineStyle) {

            this.lineStyle = lineStyle || { width: "2", color: "#0000FF" };

            this.curve = paramCurve;

            this.draw = function(context) {

                context.beginPath();

                for(var i = 1; i < this.curve.length; i++){

                    context.moveTo(this.curve[i][0],this.curve[i][1]);
                    //console.log("moveTo : " + this.curve[i] + " --> lineTo : " + this.curve[i-1]);
                    context.lineTo(this.curve[i-1][0],this.curve[i-1][1]);

                    // set drawing lineStyle
                    context.lineWidth = this.lineStyle.width;
                    context.strokeStyle = this.lineStyle.color;

                }

                // actually start drawing
                context.stroke();

            };

            // test whether the mouse position is on this Point segment
            this.isHit = function(context,pos) {
                /*var t = 0;
                 for (var i = 0; i < this._bC.length-1; i++) {
                    t = vec2.projectPointOnLine(pos, this._bC[i], this._bC[i + 1]);
                    if (t < 0.0 || t > 1.0) {
                        return false;
                    }
                    var p = vec2.add(this._bC[i], vec2.mult(vec2.sub(this._bC[i + 1], this._bC[i]), t));
                    var d = vec2.length(vec2.sub(p, pos));
                    if (d <= (this.lineStyle.width / 2) + 2){
                        return true;
                    }
                 }
                 return false;*/
                var t = 0;
                for (var i = 0; i < this.curve.length -1; i++) {
                    t = vec2.projectPointOnLine(pos, this.curve[i], this.curve[i + 1]);
                    if (t >= 0 && t <= 1) {
                        var p = vec2.add(this.curve[i], vec2.mult(vec2.sub(this.curve[i + 1], this.curve[i]), t));
                        var distance = vec2.length(vec2.sub(p, pos));
                        if (distance <= (this.lineStyle.width / 2) + 2){
                            return true;
                        }
                    }
                }
                return false;

            };

            // return list of draggers to manipulate this Point
            this.createDraggers = function() {
                var draggers = [];
                return draggers;
            };

        };

        // this module only exports the constructor for Straigh Point objects
        return ParametricCurve;

    })); // define
