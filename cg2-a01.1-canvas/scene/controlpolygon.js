/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: point_dragger
 *
 * A PointDragger is a drawable object than can react to
 * events from a SceneController. It will typically control
 * the position of one vertex/point of a scene obejct.
 *
 */


/* requireJS module definition */
define(["util", "Scene"],
    (function(util,Scene) {

        "use strict";

        var Controlpolygon = function(getControlPoints, drawStyle) {

            // remember the callbacks
            this.getCPoints = getControlPoints;

            // default draw style for the dragger
            drawStyle = drawStyle || {};
            this.drawStyle = {};
            this.drawStyle.width = drawStyle.width || 2;
            this.drawStyle.color = drawStyle.color || "#ff0000";

            // attribute queried by SceneController to recognize draggers
            this.isDragger = true;

            /*
             * draw the dragger as a small circle
             */
            this.draw = function (context) {
                var getCPoint1 = this.getCPoints[0]();
                var getCPoint2 = this.getCPoints[1]();
                var getCPoint3 = this.getCPoints[2]();


                context.beginPath();
                context.moveTo(getCPoint2[0], getCPoint2[1]);
                context.lineTo(getCPoint1[0], getCPoint1[1]);
                context.moveTo(getCPoint2[0], getCPoint2[1]);
                context.lineTo(getCPoint3[0], getCPoint3[1]);                   // clockwise
                context.closePath();

                // draw style
                context.lineWidth   = this.drawStyle.width;
                context.strokeStyle = this.drawStyle.color;

                context.stroke();
            };

            /*
             * test whether the specified mouse position "hits" this dragger
             */
            this.isHit = function (context,mousePos) {



            };

            /*
             * Event handler triggered by a SceneController when mouse
             * is being dragged
             */
            this.mouseDrag = function (dragEvent) {

            };

        };

        // this module exposes only the constructor for Dragger objects
        return Controlpolygon;

    })); // define
