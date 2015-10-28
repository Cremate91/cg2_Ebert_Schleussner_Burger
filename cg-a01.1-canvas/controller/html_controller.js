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
define(["jquery", "Line", "Circle", "Point", "KdTree", "util", "kdutil"],
    (function($, Line, Circle, Point, KdTree, Util, KdUtil) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function (context, scene, sceneController) {
            var kdTree;
            var pointList = [];

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

            $("#btnNewPoint").click((function () {
                var style = {
                    width: Math.floor(Math.random() * 3) + 1,
                    color: randomColor()
                };
                var point = new Point([randomX(), randomY()], 3, style);

                scene.addObjects([point]);
                sceneController.deselect();
                sceneController.select(point);
            }));

            $("#btnNewCircle").click((function () {
                var style = {
                    width: Math.floor(Math.random() * 3) + 1,
                    color: randomColor()
                };
                var circle = new Circle([randomX(), randomY()], 20, style);

                scene.addObjects([circle]);
                sceneController.deselect();
                sceneController.select(circle);
            }));

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


            function parAendern() {
                var geo = sceneController.getSelectedObject();


                if (geo instanceof Line) {

                    $("#inpColor").val(geo["lineStyle"]["color"]);
                    $("#inpWidth").val(geo["lineStyle"]["width"]);
                    $("#inpRadius").hide();
                    $("#inpWidth").show();
                }
                if (geo instanceof Circle) {
                    $("#inpRadius").show();
                    $("#inpWidth").show();
                    $("#inpColor").val(geo["circleStyle"]["color"]);
                    $("#inpWidth").val(geo["circleStyle"]["width"]);
                    $("#inpRadius").val(geo["r"]);
                }
                if (geo instanceof Point) {
                    $("#inpColor").val(geo["pointStyle"]["color"]);
                    $("#inpWidth").hide();
                    $("#inpRadius").hide();
                }
            }

            sceneController.onSelection(function () {
                parAendern()
            });
            sceneController.onObjChange(function () {
                parAendern()
            });


            $("#inpWidth").change(function () {
                var geo = sceneController.getSelectedObject();

                if (geo instanceof Line) {
                    geo["lineStyle"]["width"] = $("#inpWidth").val();
                }
                if (geo instanceof Circle) {
                    geo["circleStyle"]["width"] = $("#inpWidth").val();
                }
                sceneController.select(geo);
            });

            $("#inpRadius").change(function () {
                var geo = sceneController.getSelectedObject();
                geo["r"] = $("#inpRadius").val();

                scene.draw(context);
            });


            $("#inpColor").change(function () {
                var geo = sceneController.getSelectedObject();

                if (geo instanceof Line) {
                    geo["lineStyle"]["color"] = $("#inpColor").val();
                }
                if (geo instanceof Circle) {
                    geo["circleStyle"]["color"] = $("#inpColor").val();
                }
                if (geo instanceof Point) {
                    geo["pointStyle"]["color"] = $("#inpColor").val();

                }

                sceneController.select(geo);


            });


            $("#btnNewPointList").click( (function() {

                // create the actual line and add it to the scene
                var style = {
                    width: Math.floor(Math.random()*3)+1,
                    color: randomColor()
                };

                var numPoints = parseInt($("#numPoints").attr("value"));;
                for(var i=0; i<numPoints; ++i) {
                    var point = new Point([randomX(), randomY()], 5,
                        style);
                    scene.addObjects([point]);
                    pointList.push(point);
                }

                // deselect all objects, then select the newly created object
                sceneController.deselect();

            }));

            $("#visKdTree").click( (function() {

                var showTree = $("#visKdTree").attr("checked");
                if(showTree && kdTree) {
                    KdUtil.visualizeKdTree(sceneController, scene, kdTree.root, 0, 0, 600, true);
                }

            }));

            $("#btnBuildKdTree").click( (function() {

                kdTree = new KdTree(pointList);

            }));

            /**
             * creates a random query point and
             * runs linear search and kd-nearest-neighbor search
             */
            $("#btnQueryKdTree").click( (function() {

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

                var minIdx = KdUtil.linearSearch(pointList, queryPoint);

                console.log("nearest neighbor linear: ", pointList[minIdx].center);

                var kdNearestNeighbor = kdTree.findNearestNeighbor(kdTree.root, queryPoint, 10000000, kdTree.root, 0);

                console.log("nearest neighbor kd: ", kdNearestNeighbor.point.center);

                sceneController.select(pointList[minIdx]);
                sceneController.select(kdNearestNeighbor.point);

            }));

        };

// return the constructor function
        return HtmlController;


    }))
; // require



            
