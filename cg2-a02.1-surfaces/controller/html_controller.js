/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["jquery", "BufferLineGeometry", "BufferTriangleGeometry", "BufferGeometry", "random", "band", "parametricSurface", "ellipsoid", "ellipsoid_withObjFilling", "random_Triangle"],
    (function ($, BufferLineGeometry, BufferTriangleGeometry, BufferGeometry, Random, Band, ParametricSurface, Ellipsoid, Ellipsoid_withObjFilling, Random_Triangle) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function (scene) {


            $("#random").show();
            $("#band").hide();
            $("#parametricSurface").hide();
            $("#ellipsoid").hide();
            $("#ellipsoidLines").hide();
            $("#ellipsoidTriangle").hide();
            $("#randomTriangle").hide();

            $("#btnRandom").click((function () {
                $("#random").show();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#ellipsoidLines").hide();
                $("#ellipsoidTriangle").hide();
                $("#ellipsoid").hide();
                $("#randomTriangle").hide();
            }));

            $("#btnBand").click((function () {
                $("#random").hide();
                $("#band").show();
                $("#parametricSurface").hide();
                $("#ellipsoidLines").hide();
                $("#ellipsoidTriangle").hide();
                $("#ellipsoid").hide();
                $("#randomTriangle").hide();
            }));

            $("#btnParametricSurface").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").show();
                $("#ellipsoidLines").hide();
                $("#ellipsoidTriangle").hide();
                $("#ellipsoid").hide();
                $("#randomTriangle").hide();
            }));

            $("#btnEllipsoid").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#ellipsoidLines").hide();
                $("#ellipsoidTriangle").hide();
                $("#ellipsoid").show();
                $("#randomTriangle").hide();
            }));
            $("#btnEllipsoidLines").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#ellipsoidLines").show();
                $("#ellipsoidTriangle").hide();
                $("#ellipsoid").hide();
                $("#randomTriangle").hide();
            }));
            $("#btnEllipsoidTriangle").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#ellipsoidLines").hide();
                $("#ellipsoidTriangle").show();
                $("#ellipsoid").hide();
                $("#randomTriangle").hide();
            }));
            $("#btnRandomTriangle").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#ellipsoidLines").hide();
                $("#ellipsoidTriangle").hide();
                $("#ellipsoid").hide();
                $("#randomTriangle").show();
            }));


            $("#btnNewRandom").click((function () {

                var numPoints = parseInt($("#numItems").attr("value"));
                var random = new Random(numPoints);
                var bufferGeometryRandom = new BufferGeometry();
                bufferGeometryRandom.addAttribute("position", random.getPositions());
                bufferGeometryRandom.addAttribute("color", random.getColors());

                scene.addBufferGeometry(bufferGeometryRandom);
            }));


            $("#btnNewBand").click((function () {

                var config = {
                    segments: parseInt($("#numSegments").attr("value")),
                    radius: parseInt($("#radius").attr("value")),
                    height: parseInt($("#height").attr("value"))
                };


                var band = new Band(config);
                var bufferGeometryBand = new BufferGeometry();
                bufferGeometryBand.addAttribute("position", band.getPositions());
                bufferGeometryBand.addAttribute("color", band.getColors());

                scene.addBufferGeometry(bufferGeometryBand);
            }));

            $("#btnNewParametricSurface").click((function () {
                var a = parseFloat($("#aPara").attr("value"));
                var b = parseFloat($("#bPara").attr("value"));
                var c = parseFloat($("#cPara").attr("value"));
                //var option = document.forms[$("#paraOption")].elements[$("#auswahl")].getSelection();
                //console.log(option);

                var pos = function (u, v) {
                    return {
                        x: a * Math.cos(u) * Math.sin(v),
                        y: b * Math.sin(u) * Math.sin(v),
                        z: c * Math.cos(v)
                    }
                };

                var config = {
                    segments: parseInt($("#numSegmentsParametricSurface").attr("value")),
                    uSeg: parseInt($("#uSegPara").attr("value")),
                    vSeg: parseInt($("#vSegPara").attr("value")),
                    uMin: parseFloat($("#uMinPara").attr("value")),
                    uMax: parseFloat($("#uMaxPara").attr("value")),
                    vMin: parseFloat($("#vMinPara").attr("value")),
                    vMax: parseFloat($("#vMaxpara").attr("value")),
                    scale: parseInt($("#paramScale").attr("value"))
                };

                var parametricSurface = new ParametricSurface(pos, config);
                var bufferGeometryParametricSurface = new BufferGeometry();
                bufferGeometryParametricSurface.addAttribute("position", parametricSurface.getPositions());
                bufferGeometryParametricSurface.addAttribute("color", parametricSurface.getColors());

                scene.addBufferGeometry(bufferGeometryParametricSurface);
            }));

            $("#btnNewEllipsoid").click((function () {

                var a = parseFloat($("#aEllipsoid").attr("value"));
                var b = parseFloat($("#bEllipsoid").attr("value"));
                var c = parseFloat($("#cEllipsoid").attr("value"));

                var pos = function (u, v) {
                    return {
                        x: a * Math.cos(u) * Math.sin(v),
                        y: b * Math.sin(u) * Math.sin(v),
                        z: c * Math.cos(v)
                    }
                };

                var config = {
                    uSeg: parseInt($("#uSegEllipsoid").attr("value")),
                    vSeg: parseInt($("#vSegEllipsoid").attr("value")),
                    scale: parseInt($("#ellipsoidScale").attr("value"))
                };


                var ellipsoid = new Ellipsoid(pos, config);
                var bufferGeometryEllipsoid = new BufferGeometry();
                bufferGeometryEllipsoid.addAttribute("position", ellipsoid.getPositions());
                bufferGeometryEllipsoid.addAttribute("color", ellipsoid.getColors());

                scene.addBufferGeometry(bufferGeometryEllipsoid);
            }));

            $("#btnNewEllipsoidLines").click((function () {

                var pos = function (u, v) {
                    return {
                        x: Math.cos(u) * Math.sin(v),
                        y: 0.2 * Math.sin(u) * Math.sin(v),
                        z: 0.5 * Math.cos(v)
                    }
                };

                var config = {
                    uSeg: parseInt($("#uSegEllipsoidLines").attr("value")),
                    vSeg: parseInt($("#vSegEllipsoidLines").attr("value")),
                    scale: parseInt($("#ellipsoidLinesScale").attr("value"))
                };


                var ellipsoid = new Ellipsoid_withObjFilling(pos, config);
                var bufferGeometryEllipsoid = new BufferLineGeometry();
                bufferGeometryEllipsoid.addAttribute("position", ellipsoid.getPositions());
                bufferGeometryEllipsoid.addAttribute("color", ellipsoid.getColors());

                scene.addBufferGeometry(bufferGeometryEllipsoid);
            }));

            $("#btnNewEllipsoidTriangle").click((function () {

                var pos = function (u, v) {
                    return {
                        x: Math.cos(u) * Math.sin(v),
                        y: 0.2 * Math.sin(u) * Math.sin(v),
                        z: 0.5 * Math.cos(v)
                    }
                };

                var config = {
                    uSeg: parseInt($("#uSegEllipsoidTriangle").attr("value")),
                    vSeg: parseInt($("#vSegEllipsoidTriangle").attr("value")),
                    scale: parseInt($("#ellipsoidTriangleScale").attr("value")),
                    size: parseInt($("#ellipsoidTriangleSize").attr("value"))
                };


                var ellipsoid = new Ellipsoid_withObjFilling(pos, config);
                var bufferGeometryEllipsoid = new BufferTriangleGeometry();
                bufferGeometryEllipsoid.addAttribute("position", ellipsoid.getPositions());
                bufferGeometryEllipsoid.addAttribute("color", ellipsoid.getColors());

                scene.addBufferGeometry(bufferGeometryEllipsoid);
                scene.addLights(true);
            }));

            $("#btnNewRandomTriangle").click((function () {

                var numPoints = parseInt($("#numItemsTriangle").attr("value"));
                var triangleSize = parseInt($("#triangleSize").attr("value"));

                var randomTriangles = new Random_Triangle(numPoints, triangleSize);
                var bufferGeometryRandomTriangles = new BufferTriangleGeometry();
                bufferGeometryRandomTriangles.addAttribute("position", randomTriangles.getPositions());
                bufferGeometryRandomTriangles.addAttribute("normal", randomTriangles.getNormals());
                bufferGeometryRandomTriangles.addAttribute("color", randomTriangles.getColors());

                scene.addBufferGeometry(bufferGeometryRandomTriangles);
                scene.addLights(true);
            }));

            $("#anim").click((function () {
                if ($("#anim").attr('checked')) {
                    animate();
                    //console.log("start");
                } else {
                    //console.log("stop");
                    stopAnimate();
                }
            }));

            var ani;

            function animate() {
                scene.letAnim(true);
                ani = requestAnimationFrame(animate);
            }

            function stopAnimate() {
                cancelAnimationFrame(ani);
            }


        };

// return the constructor function
        return HtmlController;


    }))
; // require



            
