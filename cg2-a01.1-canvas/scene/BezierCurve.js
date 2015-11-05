/**
 * Created by Phenax on 29.10.2015.
 */

/* requireJS module definition */
define(["util", "vec2", "Scene", "PointDragger", "Controlpolygon"],
    (function (util, vec2, Scene, PointDragger, Controlpolygon) {


        var BezierCurve = function (bCurve, segments, lineStyle) {

            var minT = 0;
            var maxT = 1;
            /*var f = function (t) {
             var xT;
             //xT = eval($("#btnXT").val());
             xT = -Math.pow((1 - t), 3) + Math.pow(t, 3);
             xT = Math.floor(xT);
             console.log("xT = " + xT);
             return xT;
             };*/
            /*var g = function (t) {
             var yT;
             //yT = eval($("#btnYT").val());
             yT = 3 * Math.pow((1 - t), 2) * t - 3 * (1 - t) * Math.pow(t, 2);
             yT = Math.floor(yT);
             console.log("yT = " + yT);
             return yT;
             };*/

            this.controlPoint1 = [bCurve[0].center[0], bCurve[0].center[1]];
            console.log("Kontrollpunkt1 = [" + bCurve[0].center[0] + "," +  bCurve[0].center[1] + "]");
            this.controlPoint2 = [bCurve[1].center[0], bCurve[1].center[1]];
            console.log("Kontrollpunkt2 = [" + bCurve[1].center[0] + "," +  bCurve[1].center[1] + "]");
            this.controlPoint3 = [bCurve[2].center[0], bCurve[2].center[1]];
            console.log("Kontrollpunkt3 = [" + bCurve[2].center[0] + "," +  bCurve[2].center[1] + "]");

            this.segments = segments || 100;

            this.lineStyle = lineStyle || {width: "2", color: "#FF0000"};

            this._bC = [];

            this.draw = function (context) {
                this._bC = [];
                context.beginPath();

                for (var t = minT; t <= maxT; t += (1 / this.segments)) {
                    var a0 = [((1 - t) * this.controlPoint1[0] + t * this.controlPoint2[0]),
                        ((1 - t) * this.controlPoint1[1] + t * this.controlPoint2[1])];
                    var a1 = [((1 - t) * this.controlPoint2[0] + t * this.controlPoint3[0]),
                        ((1 - t) * this.controlPoint2[1] + t * this.controlPoint3[1])];
                    var b0 = [((1 - t) * a0[0] + t * a1[0]),
                        ((1 - t) * a0[1] + t * a1[1])];
                    context.lineTo(b0[0], b0[1]);
                    this._bC.push(b0);
                }


                context.lineWidth = this.lineStyle.width;
                context.strokeStyle = this.lineStyle.color;
                // actually start drawing
                context.stroke();

            };

            // test whether the mouse position is on this Point segment
            this.isHit = function (context, pos) {
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
                for (var i = 0; i < this._bC.length -1; i++) {
                    t = vec2.projectPointOnLine(pos, this._bC[i], this._bC[i + 1]);
                    if (t >= 0 && t <= 1) {
                        var p = vec2.add(this._bC[i], vec2.mult(vec2.sub(this._bC[i + 1], this._bC[i]), t));
                        var d = vec2.length(vec2.sub(p, pos));
                        if (d <= (this.lineStyle.width / 2) + 2){
                            return true;
                        }
                    }
                }
                return false;
            };

            // return list of draggers to manipulate this Point
            this.createDraggers = function () {

                var draggerStyleFill = {radius: 4, color: this.lineStyle.color, width: 0, fill: true};
                var draggerStyle = {radius: 4, color: this.lineStyle.color, width: 0, fill: false};
                var draggers = [];

                // create closure and callbacks for dragger
                var _bezierCurve = this;
                var getCP1 = function () {
                    return _bezierCurve.controlPoint1;
                };
                var getCP2 = function () {
                    return _bezierCurve.controlPoint2;
                };
                var getCP3 = function () {
                    return _bezierCurve.controlPoint3;
                };
                var setCP1 = function (dragEvent) {
                    _bezierCurve.controlPoint1 = dragEvent.position;
                };
                var setCP2 = function (dragEvent) {
                    _bezierCurve.controlPoint2 = dragEvent.position;
                };
                var setCP3 = function (dragEvent) {
                    _bezierCurve.controlPoint3 = dragEvent.position;
                };
                var getControlPoints = [getCP1, getCP2, getCP3];
                draggers.push(new PointDragger(getCP1, setCP1, draggerStyleFill));
                draggers.push(new PointDragger(getCP2, setCP2, draggerStyle));
                draggers.push(new PointDragger(getCP3, setCP3, draggerStyle));
                draggers.push(new Controlpolygon(getControlPoints));
                return draggers;

            };


        };

// this module only exports the constructor for Straigh Point objects
        return BezierCurve;

    }))
; // define
