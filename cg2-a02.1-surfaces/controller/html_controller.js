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
define(["jquery", "BufferLineGeometry", "BufferTriangleGeometry", "BufferGeometry", "random", "band", "parametricSurface", "ellipsoid_withObjFilling", "random_Triangle"],
    (function ($, BufferLineGeometry, BufferTriangleGeometry, BufferGeometry, Random, Band, ParametricSurface, Ellipsoid_withObjFilling, Random_Triangle) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function (scene) {


            $("#random").show();
            $("#band").hide();
            $("#parametricSurface").hide();
            $("#dinisSurface").hide();
            $("#tranguloidTrefoil").hide();
            $("#ellipsoid").hide();
            $("#ellipsoidWithFill").hide();
            $("#randomTriangle").hide();

            $("#btnRandom").click((function () {
                $("#random").show();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#dinisSurface").hide();
                $("#tranguloidTrefoil").hide();
                $("#ellipsoidWithFill").hide();
                $("#ellipsoid").hide();
                $("#randomTriangle").hide();
            }));

            $("#btnBand").click((function () {
                $("#random").hide();
                $("#band").show();
                $("#dinisSurface").hide();
                $("#parametricSurface").hide();
                $("#tranguloidTrefoil").hide();
                $("#ellipsoidWithFill").hide();
                $("#ellipsoid").hide();
                $("#randomTriangle").hide();
            }));

            $("#btnParametricSurface").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").show();
                $("#dinisSurface").hide();
                $("#tranguloidTrefoil").hide();
                $("#ellipsoidWithFill").hide();
                $("#ellipsoid").hide();
                $("#randomTriangle").hide();
            }));

            $("#btnEllipsoid").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#dinisSurface").hide();
                $("#tranguloidTrefoil").hide();
                $("#ellipsoidWithFill").hide();
                $("#ellipsoid").show();
                $("#randomTriangle").hide();
            }));
            $("#btnEllipsoidWithFill").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#dinisSurface").hide();
                $("#tranguloidTrefoil").hide();
                $("#ellipsoidWithFill").show();
                $("#ellipsoid").hide();
                $("#randomTriangle").hide();
            }));
            $("#btnRandomTriangle").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#dinisSurface").hide();
                $("#tranguloidTrefoil").hide();
                $("#ellipsoidWithFill").hide();
                $("#ellipsoid").hide();
                $("#randomTriangle").show();
            }));
            $("#btnDinis").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#dinisSurface").show();
                $("#tranguloidTrefoil").hide();
                $("#ellipsoidWithFill").hide();
                $("#ellipsoid").hide();
                $("#randomTriangle").hide();
            }));
            $("#btnTranguloidTrefoil").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#dinisSurface").hide();
                $("#tranguloidTrefoil").show();
                $("#ellipsoidWithFill").hide();
                $("#ellipsoid").hide();
                $("#randomTriangle").hide();
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

                if ($("#matPoint").attr('checked') || $("#matLine").attr('checked') ||
                    $("#matTriangle").attr('checked')) {

                    var bufferGeometryParametricSurface;

                    if ($("#matPoint").attr('checked') && !( $("#matLine").attr('checked') || $("#matTriangle").attr('checked') )) {
                        bufferGeometryParametricSurface = new BufferGeometry();
                    } else if ($("#matLine").attr('checked') && !( $("#matPoint").attr('checked') || $("#matTriangle").attr('checked') )) {
                        bufferGeometryParametricSurface = new BufferLineGeometry();
                    } else if ($("#matTriangle").attr('checked') && !( $("#matLine").attr('checked') || $("#matPoint").attr('checked') )) {
                        bufferGeometryParametricSurface = new BufferTriangleGeometry();
                    } else if ($("#matPoint").attr('checked') &&
                        $("#matLine").attr('checked') && !($("#matTriangle").attr('checked') )) {
                        // Point- und Line-Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("Point- und Line-Materialien wurden ausgewählt");
                    } else if ($("#matPoint").attr('checked') &&
                        $("#matTriangle").attr('checked') && !($("#matLine").attr('checked') )) {
                        // Point- und Triangle-Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("Point- und Triangle-Materialien wurden ausgewählt");
                    } else if ($("#matTriangle").attr('checked') &&
                        $("#matLine").attr('checked') && !($("#matPoint").attr('checked') )) {
                        // Triangle- und Line-Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("Triangle- und Line-Materialien wurden ausgewählt");
                    } else {
                        // alle drei Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("alle drei Materialien wurden ausgewählt");
                    }


                    bufferGeometryParametricSurface.addAttribute("position", parametricSurface.getPositions());
                    bufferGeometryParametricSurface.addAttribute("color", parametricSurface.getColors());

                    scene.addBufferGeometry(bufferGeometryParametricSurface);
                } else {
                    alert("Es muss ein Material gewählt worden sein.");
                }

            }));

            $("#btnNewDinis").click((function () {
                var a = parseFloat($("#aDinis").attr("value"));
                var b = parseFloat($("#bDinis").attr("value"));

                var pos = function (u, v) {
                    return {
                        x: a * Math.cos(u) * Math.sin(v),
                        y: a * Math.sin(u) * Math.sin(v),
                        z: a * (Math.cos(v) + Math.log(Math.tan(v/2))) + b * u
                    }
                };

                var config = {
                    uSeg: parseInt($("#uSegDinis").attr("value")),
                    vSeg: parseInt($("#vSegDinis").attr("value")),
                    uMin: parseFloat($("#uMinDinis").attr("value")),
                    uMax: parseFloat($("#uMaxDinis").attr("value")),
                    vMin: parseFloat($("#vMinDinis").attr("value")),
                    vMax: parseFloat($("#vMaxDinis").attr("value")),
                    scale: parseInt($("#dinisScale").attr("value"))
                };

                var ellipsoid = new ParametricSurface(pos, config);

                if ($("#matPointDinis").attr('checked') || $("#matLineDinis").attr('checked') ||
                    $("#matTriangleDinis").attr('checked')) {
                    var bufferGeometryParametricSurface;

                    if ($("#matPointDinis").attr('checked') && !( $("#matLineDinis").attr('checked') ||
                        $("#matTriangleDinis").attr('checked') )) {
                        bufferGeometryParametricSurface = new BufferGeometry();
                    } else if ($("#matLineDinis").attr('checked') && !( $("#matPointDinis").attr('checked') ||
                        $("#matTriangleDinis").attr('checked') )) {
                        bufferGeometryParametricSurface = new BufferLineGeometry();
                    } else if ($("#matTriangleDinis").attr('checked') && !( $("#matLineDinis").attr('checked') ||
                        $("#matPointDinis").attr('checked') )) {
                        bufferGeometryParametricSurface = new BufferTriangleGeometry();
                    } else if ($("#matPointDinis").attr('checked') &&
                        $("#matLineDinis").attr('checked') && !($("#matTriangleDinis").attr('checked') )) {
                        // Point- und Line-Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("Point- und Line-Materialien wurden ausgewählt");
                    } else if ($("#matPointDinis").attr('checked') &&
                        $("#matTriangleDinis").attr('checked') && !($("#matLineDinis").attr('checked') )) {
                        // Point- und Triangle-Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("Point- und Triangle-Materialien wurden ausgewählt");
                    } else if ($("#matTriangleDinis").attr('checked') &&
                        $("#matLineDinis").attr('checked') && !($("#matPointDinis").attr('checked') )) {
                        // Triangle- und Line-Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("Triangle- und Line-Materialien wurden ausgewählt");
                    } else {
                        // alle drei Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("alle drei Materialien wurden ausgewählt");
                    }


                    bufferGeometryParametricSurface.addAttribute("position", ellipsoid.getPositions());
                    bufferGeometryParametricSurface.addAttribute("color", ellipsoid.getColors());
                    scene.addBufferGeometry(bufferGeometryParametricSurface);
                } else {
                    alert("Es muss ein Material gewählt worden sein.");
                }
            }));

            $("#btnNewTranguloidTrefoil").click((function () {

                var pos = function (u, v) {
                    return {
                        x: 2 * Math.sin(3*u) /  (2 + Math.cos(v)),
                        y: 2 * (Math.sin(u) + 2 * Math.sin(2*u)) / (2 + Math.cos(v + 2 * Math.PI / 3)),
                        z: (Math.cos(u) - 2* Math.cos(2 * u)) * (2 * Math.cos(v)) *
                        (2 + Math.cos(v + 2 * Math.PI/3)) / 4
                    }
                };

                var config = {
                    uSeg: parseInt($("#uSegTranguloidTrefoil").attr("value")),
                    vSeg: parseInt($("#vSegTranguloidTrefoil").attr("value")),
                    uMin: parseFloat($("#uMinTranguloidTrefoil").attr("value")),
                    uMax: parseFloat($("#uMaxTranguloidTrefoil").attr("value")),
                    vMin: parseFloat($("#vMinTranguloidTrefoil").attr("value")),
                    vMax: parseFloat($("#vMaxTranguloidTrefoil").attr("value")),
                    scale: parseInt($("#tranguloidTrefoilScale").attr("value"))
                };

                var ellipsoid = new ParametricSurface(pos, config);

                if ($("#matPointTranguloidTrefoil").attr('checked') ||
                    $("#matLineTranguloidTrefoil").attr('checked') ||
                    $("#matTriangleTranguloidTrefoil").attr('checked')) {
                    var bufferGeometryParametricSurface;

                    if ($("#matPointTranguloidTrefoil").attr('checked') &&
                        !( $("#matLineTranguloidTrefoil").attr('checked') ||
                        $("#matTriangleTranguloidTrefoil").attr('checked') )) {
                        bufferGeometryParametricSurface = new BufferGeometry();
                    } else if ($("#matLineTranguloidTrefoil").attr('checked') &&
                        !( $("#matPointTranguloidTrefoil").attr('checked') ||
                        $("#matTriangleTranguloidTrefoil").attr('checked') )) {
                        bufferGeometryParametricSurface = new BufferLineGeometry();
                    } else if ($("#matTriangleTranguloidTrefoil").attr('checked') &&
                        !( $("#matLineTranguloidTrefoil").attr('checked') ||
                        $("#matPointTranguloidTrefoil").attr('checked') )) {
                        bufferGeometryParametricSurface = new BufferTriangleGeometry();
                    } else if ($("#matPointTranguloidTrefoil").attr('checked') &&
                        $("#matLineTranguloidTrefoil").attr('checked') &&
                        !($("#matTriangleTranguloidTrefoil").attr('checked') )) {
                        // Point- und Line-Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("Point- und Line-Materialien wurden ausgewählt");
                    } else if ($("#matPointTranguloidTrefoil").attr('checked') &&
                        $("#matTriangleTranguloidTrefoil").attr('checked') &&
                        !($("#matLineTranguloidTrefoil").attr('checked') )) {
                        // Point- und Triangle-Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("Point- und Triangle-Materialien wurden ausgewählt");
                    } else if ($("#matTriangleTranguloidTrefoil").attr('checked') &&
                        $("#matLineTranguloidTrefoil").attr('checked') &&
                        !($("#matPointTranguloidTrefoil").attr('checked') )) {
                        // Triangle- und Line-Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("Triangle- und Line-Materialien wurden ausgewählt");
                    } else {
                        // alle drei Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("alle drei Materialien wurden ausgewählt");
                    }


                    bufferGeometryParametricSurface.addAttribute("position", ellipsoid.getPositions());
                    bufferGeometryParametricSurface.addAttribute("color", ellipsoid.getColors());
                    scene.addBufferGeometry(bufferGeometryParametricSurface);
                } else {
                    alert("Es muss ein Material gewählt worden sein.");
                }            }));

            $("#btnNewEllipsoid").click((function () {

                var pos = function (u, v) {
                    return {
                        x: Math.cos(u) * Math.sin(v),
                        y: 0.2 * Math.sin(u) * Math.sin(v),
                        z: 0.5 * Math.cos(v)
                    }
                };

                var config = {
                    uSeg: parseInt($("#uSegEllipsoid").attr("value")),
                    vSeg: parseInt($("#vSegEllipsoid").attr("value")),
                    scale: parseInt($("#ellipsoidScale").attr("value"))
                };

                var ellipsoid = new ParametricSurface(pos, config);

                if ($("#matPointEllipsoid").attr('checked') || $("#matLineEllipsoid").attr('checked') ||
                    $("#matTriangleEllipsoid").attr('checked')) {
                    var bufferGeometryParametricSurface;

                    if ($("#matPointEllipsoid").attr('checked') && !( $("#matLineEllipsoid").attr('checked') ||
                        $("#matTriangleEllipsoid").attr('checked') )) {
                        bufferGeometryParametricSurface = new BufferGeometry();
                    } else if ($("#matLineEllipsoid").attr('checked') && !( $("#matPointEllipsoid").attr('checked') ||
                        $("#matTriangleEllipsoid").attr('checked') )) {
                        bufferGeometryParametricSurface = new BufferLineGeometry();
                    } else if ($("#matTriangleEllipsoid").attr('checked') && !( $("#matLineEllipsoid").attr('checked') ||
                        $("#matPointEllipsoid").attr('checked') )) {
                        bufferGeometryParametricSurface = new BufferTriangleGeometry();
                    } else if ($("#matPointEllipsoid").attr('checked') &&
                        $("#matLineEllipsoid").attr('checked') && !($("#matTriangleEllipsoid").attr('checked') )) {
                        // Point- und Line-Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("Point- und Line-Materialien wurden ausgewählt");
                    } else if ($("#matPointEllipsoid").attr('checked') &&
                        $("#matTriangleEllipsoid").attr('checked') && !($("#matLineEllipsoid").attr('checked') )) {
                        // Point- und Triangle-Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("Point- und Triangle-Materialien wurden ausgewählt");
                    } else if ($("#matTriangleEllipsoid").attr('checked') &&
                        $("#matLineEllipsoid").attr('checked') && !($("#matPointEllipsoid").attr('checked') )) {
                        // Triangle- und Line-Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("Triangle- und Line-Materialien wurden ausgewählt");
                    } else {
                        // alle drei Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("alle drei Materialien wurden ausgewählt");
                    }


                    bufferGeometryParametricSurface.addAttribute("position", ellipsoid.getPositions());
                    bufferGeometryParametricSurface.addAttribute("color", ellipsoid.getColors());
                    scene.addBufferGeometry(bufferGeometryParametricSurface);
                } else {
                    alert("Es muss ein Material gewählt worden sein.");
                }
            }));

            $("#btnNewEllipsoidWithFill").click((function () {

                var pos = function (u, v) {
                    return {
                        x: Math.cos(u) * Math.sin(v),
                        y: 0.2 * Math.sin(u) * Math.sin(v),
                        z: 0.5 * Math.cos(v)
                    }
                };

                var config = {
                    uSeg: parseInt($("#uSegEllipsoidWithFill").attr("value")),
                    vSeg: parseInt($("#vSegEllipsoidWithFill").attr("value")),
                    scale: parseInt($("#ellipsoidWithFillScale").attr("value"))
                };

                var ellipsoid = new Ellipsoid_withObjFilling(pos, config);

                if ($("#matPointEllipsoidWithFill").attr('checked') || $("#matLineEllipsoidWithFill").attr('checked') ||
                    $("#matTriangleEllipsoidWithFill").attr('checked')) {

                    var bufferGeometryParametricSurface;

                    if ($("#matPointEllipsoidWithFill").attr('checked') && !( $("#matLineEllipsoidWithFill").attr('checked') ||
                        $("#matTriangleEllipsoidWithFill").attr('checked') )) {
                        bufferGeometryParametricSurface = new BufferGeometry();
                    } else if ($("#matLineEllipsoidWithFill").attr('checked') && !( $("#matPointEllipsoidWithFill").attr('checked') ||
                        $("#matTriangleEllipsoidWithFill").attr('checked') )) {
                        bufferGeometryParametricSurface = new BufferLineGeometry();
                    } else if ($("#matTriangleEllipsoidWithFill").attr('checked') && !( $("#matLineEllipsoidWithFill").attr('checked') ||
                        $("#matPointEllipsoidWithFill").attr('checked') )) {
                        bufferGeometryParametricSurface = new BufferTriangleGeometry();
                    } else if ($("#matPointEllipsoidWithFill").attr('checked') &&
                        $("#matLineEllipsoidWithFill").attr('checked') && !($("#matTriangleEllipsoidWithFill").attr('checked') )) {
                        // Point- und Line-Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("Point- und Line-Materialien wurden ausgewählt");
                    } else if ($("#matPointEllipsoidWithFill").attr('checked') &&
                        $("#matTriangleEllipsoidWithFill").attr('checked') && !($("#matLineEllipsoidWithFill").attr('checked') )) {
                        // Point- und Triangle-Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("Point- und Triangle-Materialien wurden ausgewählt");
                    } else if ($("#matTriangleEllipsoidWithFill").attr('checked') &&
                        $("#matLineEllipsoidWithFill").attr('checked') && !($("#matPointEllipsoidWithFill").attr('checked') )) {
                        // Triangle- und Line-Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("Triangle- und Line-Materialien wurden ausgewählt");
                    } else {
                        // alle drei Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("alle drei Materialien wurden ausgewählt");
                    }


                    bufferGeometryParametricSurface.addAttribute("position", ellipsoid.getPositions());
                    bufferGeometryParametricSurface.addAttribute("color", ellipsoid.getColors());

                    scene.addBufferGeometry(bufferGeometryParametricSurface);
                } else {
                    alert("Es muss ein Material gewählt worden sein.");
                }

            }));

            /*$("#btnNewEllipsoidTriangle").click((function () {

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
            }));*/

            $("#btnNewRandomTriangle").click((function () {

                var numPoints = parseInt($("#numItemsTriangle").attr("value"));
                var triangleSize = parseInt($("#triangleSize").attr("value"));

                var randomTriangles = new Random_Triangle(numPoints, triangleSize);
                var bufferGeometryRandomTriangles = new BufferTriangleGeometry();
                bufferGeometryRandomTriangles.addAttribute("position", randomTriangles.getPositions());
                bufferGeometryRandomTriangles.addAttribute("normal", randomTriangles.getNormals());
                bufferGeometryRandomTriangles.addAttribute("color", randomTriangles.getColors());

                scene.addBufferGeometry(bufferGeometryRandomTriangles);
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



            
