/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["jquery", "Line", "Circle", "Point", "KdTree", "util", "kdutil", "ParametricCurve", "BezierCurve"],
    (function ($, Line, Circle, Point, KdTree, Util, KdUtil, ParametricCurve, BezierCurve) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function (context, scene, sceneController) {

            var kdTree;
            var pointList = [];

            /********************** random stats **********************/

            // generate random X coordinate within the canvas
            var randomX = function () {
                return Math.floor(Math.random() * (context.canvas.width - 10)) + 5;
            };

            // generate random Y coordinate within the canvas
            var randomY = function () {
                return Math.floor(Math.random() * (context.canvas.height - 10)) + 5;
            };

            // generate random color in hex notation
            var randomColor = function () {

                // convert a byte (0...255) to a 2-digit hex string
                var toHex2 = function (byte) {
                    var s = byte.toString(16); // convert to hex string
                    if (s.length == 1) s = "0" + s; // pad with leading 0
                    return s;
                };

                var r = Math.floor(Math.random() * 25.9) * 10;
                var g = Math.floor(Math.random() * 25.9) * 10;
                var b = Math.floor(Math.random() * 25.9) * 10;

                // convert to hex notation
                return "#" + toHex2(r) + toHex2(g) + toHex2(b);
            };

            var randomRad = function () {
                return (Math.floor(Math.random() * (context.canvas.height / 2)));
            };

            var randomPointRad = function () {
                return Math.random() * (4);
            };

            /********************** new objects **********************/

            /*
             * event handler for "new line button".
             */
            $("#btnNewLine").click((function () {

                // create the actual line and add it to the scene
                var style = {
                    width: Math.floor(Math.random() * 3) + 1,
                    color: randomColor()
                };

                var line = new Line([randomX(), randomY()],
                    [randomX(), randomY()],
                    style);
                scene.addObjects([line]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(line); // this will also redraw

            }));

            /*
             * event handler for "new circle button".
             */
            $("#btnNewCircle").click((function () {

                // create the actual line and add it to the scene
                var style = {
                    width: Math.floor(Math.random() * 3) + 1,
                    color: randomColor()
                };

                var rad = randomRad();
                var x = randomX();
                var y = randomY();

                if (x > (context.canvas.width - rad) || x < (0 + rad) || y > (context.canvas.height - rad) || y < (0 + rad)) rad /= 3;

                var circle = new Circle([x, y], rad, style);
                scene.addObjects([circle]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(circle); // this will also redraw

            }));

            /*
             * event handler for "new point button".
             */
            $("#btnNewPoint").click((function () {

                // create the actual line and add it to the scene
                var style = {color: randomColor()};

                var point = new Point([randomX(), randomY()], randomPointRad(), style);
                scene.addObjects([point]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(point); // this will also redraw

            }));

            $("#btnNewParamatricCurve").click((function () {
                var pCurve = [];
                var minT = $("#btnMinT").val();
                var maxT = $("#btnMaxT").val();
                var segCount = $("#btnSegments").val();
                console.log("minT = " + minT + " & maxT = " + maxT + " & segCount = " + segCount);
                var f = function (t) {
                    var xT;
                    xT = eval($("#btnXT").val());
                    //xT = 200*Math.sin(t);
                    xT = Math.floor(xT);
                    //console.log("xT = " + xT);
                    return xT;
                };
                var g = function (t) {
                    var yT;
                    yT = eval($("#btnYT").val());
                    //yT = 200*Math.cos(t);
                    yT = Math.floor(yT);
                    //console.log("yT = " + yT);
                    return yT;
                };
                try {
                    for (var i = 0; i <= segCount; i++) {
                        var t = minT + i / segCount * (maxT - minT);
                        pCurve[i] = [f(t), g(t)];
                    }
                    var parametricCurve = new ParametricCurve(pCurve);
                    scene.addObjects([parametricCurve]);
                    sceneController.deselect();
                    sceneController.select(parametricCurve); // this will also redraw
                } catch (err) {
                    alert("x von t oder y von t konnte nicht bestimmt werden, bitte überprüfen!\n" +
                        err.message);
                }
            }));

            $("#btnNewBezierCurve").click((function () {

                var segCount = $("#btnSegments").val();
                var bCurve = [];
                for (var i = 0; i < 3; i++) {
                    bCurve[i] = new Point([randomX(), randomY()], 2, {color: "#ff0000"});
                }
                var bezierCurve = new BezierCurve(bCurve, segCount);
                scene.addObjects([bezierCurve]);
                sceneController.deselect();
                sceneController.select(bezierCurve); // this will also redraw

            }));

            /********************** get informations from objects **********************/

            var getInfoFromALinie = function (obj) {
                $("#btnNewColor").val(obj["lineStyle"]["color"]);
                $("#btnLineWidth").val(obj["lineStyle"]["width"]);
                $("#btnRadius").hide();
                $("#btnNewColor").show();
                $("#btnLineWidth").show();
            };

            var getInfoFromACircle = function (obj) {
                $("#btnNewColor").val(obj["circleStyle"]["color"]);
                $("#btnLineWidth").val(obj["circleStyle"]["width"]);
                $("#btnRadius").val(obj["r"]);
                $("#btnNewColor").show();
                $("#btnLineWidth").show();
                $("#btnRadius").show();
            };

            var getInfoFromAPoint = function (obj) {
                $("#btnNewColor").val(obj["pointStyle"]["color"]);
                $("#btnRadius").val(obj["r"]);
                $("#btnLineWidth").hide();
                $("#btnNewColor").show();
                $("#btnRadius").show();
            };

            var getInfoFromAParametricCurve = function (obj) {
                $("#btnNewColor").val("#0000FF");
                $("#btnLineWidth").hide();
                $("#btnRadius").hide();
                $("#btnNewColor").show();
            };

            var getInfoFromABezierCurve = function (obj) {
                $("#btnNewColor").val("#FF0000");
                $("#btnLineWidth").hide();
                $("#btnRadius").hide();
                $("#btnNewColor").show();
            };

            sceneController.onSelection(function () {

                var geom = sceneController.getSelectedObject();
                //console.log( "geom, was habe ich angeklickt? = " + geom + ", " + geom.name + ", " + geom.id + ", " + geom.text );
                //console.log( "geom instanceof Line :" + String(geom instanceof Line) );
                //console.log( geom instanceof Line );
                if (geom instanceof Line) {
                    getInfoFromALinie(geom);
                    //console.log("It's a line .. ");
                }
                if (geom instanceof Circle) {
                    getInfoFromACircle(geom);
                    //console.log("It's a circle .. ");
                }
                if (geom instanceof Point) {
                    getInfoFromAPoint(geom);
                    //console.log(geom.center);
                    //console.log("It's a point .. ");
                }
                if (geom instanceof ParametricCurve) {
                    getInfoFromAParametricCurve(geom);
                }
                if (geom instanceof BezierCurve) {
                    getInfoFromABezierCurve(geom);
                }
            });

            /********************** configure objects **********************/

            $("#btnNewColor").change(function () {
                var geom = sceneController.getSelectedObject();
                if (geom instanceof Line) {
                    geom["lineStyle"]["color"] = $("#btnNewColor").val();
                    console.log("Linecolor has changed!");
                }
                if (geom instanceof Circle) {
                    geom["circleStyle"]["color"] = $("#btnNewColor").val();
                    console.log("Circlecolor has changed!");
                }
                if (geom instanceof Point) {
                    geom["pointStyle"]["color"] = $("#btnNewColor").val();
                    console.log("Pointcolor has changed!");
                }
                sceneController.select(geom);
            });

            $("#btnLineWidth").change(function () {
                var geom = sceneController.getSelectedObject();
                if (geom instanceof Line) {
                    geom["lineStyle"]["width"] = $("#btnLineWidth").val();
                    console.log("Linelinewidth has changed!");
                }
                if (geom instanceof Circle) {
                    geom["circleStyle"]["width"] = $("#btnLineWidth").val();
                    console.log("Circlelinewidth has changed!");
                }
                if (geom instanceof Point) {
                    //geom["pointStyle"]["width"] = $("#btnLineWidth").val();                        
                    //console.log("Pointlinewidth has changed!");
                }
                sceneController.select(geom);
            });

            $("#btnRadius").change(function () {
                var geom = sceneController.getSelectedObject();
                if (geom instanceof Line) {
                    //geom["r"] = $("#btnRadius").val();                        
                    //console.log("Lineradius has changed!");
                }
                if (geom instanceof Circle) {
                    geom["r"] = $("#btnRadius").val();
                    console.log("Circleradius has changed!");
                }
                if (geom instanceof Point) {
                    geom["r"] = $("#btnRadius").val();
                    console.log("Pointradius has changed!");
                }
                sceneController.select(geom);
            });

            sceneController.onObjChange(function () {
                if (sceneController.getSelectedObject() instanceof Circle) {
                    getInfoFromACircle(sceneController.getSelectedObject())
                }
            });

            /********************** KD-Tree **********************/

            $("#btnNewPointList").click((function () {

                // create the actual line and add it to the scene
                var style = {
                    width: Math.floor(Math.random() * 3) + 1,
                    color: randomColor()
                };

                var numPoints = parseInt($("#numPoints").attr("value"));
                for (var i = 0; i < numPoints; ++i) {
                    var point = new Point([randomX(), randomY()], 5,
                        style);
                    scene.addObjects([point]);
                    pointList.push(point);
                }

                // deselect all objects, then select the newly created object
                sceneController.deselect();

            }));

            $("#visKdTree").click((function () {

                var showTree = $("#visKdTree").attr("checked");
                if (showTree && kdTree) {
                    KdUtil.visualizeKdTree(sceneController, scene, kdTree.root, 0, 0, 600, true);
                }

            }));

            $("#btnBuildKdTree").click((function () {

                kdTree = new KdTree(pointList);

            }));

            /**
             * creates a random query point and
             * runs linear search and kd-nearest-neighbor search
             */
            $("#btnQueryKdTree").click((function () {

                var style = {
                    width: 2,
                    color: "#ff0000"
                };
                var queryPoint = new Point([randomX(), randomY()], 2,
                    style);
                scene.addObjects([queryPoint]);
                sceneController.select(queryPoint);

                console.log("query point: ", queryPoint.center);

                ////////////////////////////////////////////////
                // TODO: measure and compare timings of linear
                //       and kd-nearest-neighbor search
                ////////////////////////////////////////////////
                var linearTiming;
                var kdTiming;

                var start = new Date().getMilliseconds();
                var minIdx = KdUtil.linearSearch(pointList, queryPoint);
                var end = new Date().getMilliseconds();
                console.log("nearest neighbor linear: ", pointList[minIdx].center);

                var start2 = new Date().getMilliseconds();
                var kdNearestNeighbor = kdTree.findNearestNeighbor(kdTree.root, queryPoint, 10000000, kdTree.root, 0);
                var end2 = new Date().getMilliseconds();
                console.log("nearest neighbor kd: ", kdNearestNeighbor.point.center);

                linearTiming = end - start;
                kdTiming = end2 - start2;

                console.log("linearSearch: " + linearTiming + "ms\nkdSearch: " + kdTiming + "ms");

                sceneController.select(pointList[minIdx]);
                sceneController.select(kdNearestNeighbor.point);

            }));
        };

        // return the constructor function
        return HtmlController;


    })); // require


            
