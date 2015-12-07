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
            $("#customRandom").hide();

            $("#btnRandom").click((function () {
                $("#random").show();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#dinisSurface").hide();
                $("#tranguloidTrefoil").hide();
                $("#ellipsoidWithFill").hide();
                $("#ellipsoid").hide();
                $("#customRandom").hide();
            }));
            $("#btnBand").click((function () {
                $("#random").hide();
                $("#band").show();
                $("#dinisSurface").hide();
                $("#parametricSurface").hide();
                $("#tranguloidTrefoil").hide();
                $("#ellipsoidWithFill").hide();
                $("#ellipsoid").hide();
                $("#customRandom").hide();
            }));
            $("#btnParametricSurface").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").show();
                $("#dinisSurface").hide();
                $("#tranguloidTrefoil").hide();
                $("#ellipsoidWithFill").hide();
                $("#ellipsoid").hide();
                $("#customRandom").hide();
            }));
            $("#btnEllipsoid").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#dinisSurface").hide();
                $("#tranguloidTrefoil").hide();
                $("#ellipsoidWithFill").hide();
                $("#ellipsoid").show();
                $("#customRandom").hide();
            }));
            $("#btnEllipsoidWithFill").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#dinisSurface").hide();
                $("#tranguloidTrefoil").hide();
                $("#ellipsoidWithFill").show();
                $("#ellipsoid").hide();
                $("#customRandom").hide();
            }));
            $("#btnCustomRandom").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#dinisSurface").hide();
                $("#tranguloidTrefoil").hide();
                $("#ellipsoidWithFill").hide();
                $("#ellipsoid").hide();
                $("#customRandom").show();
            }));
            $("#btnDinis").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#dinisSurface").show();
                $("#tranguloidTrefoil").hide();
                $("#ellipsoidWithFill").hide();
                $("#ellipsoid").hide();
                $("#customRandom").hide();
            }));
            $("#btnTranguloidTrefoil").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#dinisSurface").hide();
                $("#tranguloidTrefoil").show();
                $("#ellipsoidWithFill").hide();
                $("#ellipsoid").hide();
                $("#customRandom").hide();
            }));


            $("#btnNewRandom").click((function () {

                var numPoints = parseInt($("#numItems").attr("value"));

                var random = new Random(numPoints);
                var bufferGeometryRandom = getBufferGeometry();

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
                var bufferGeometryBand = getBufferGeometry();

                bufferGeometryBand.addAttribute("position", band.getPositions());
                bufferGeometryBand.addAttribute("color", band.getColors());

                scene.addBufferGeometry(bufferGeometryBand);
            }));
            $("#btnNewParametricSurface").click((function () {
                var a = parseFloat($("#aPara").attr("value"));
                var b = parseFloat($("#bPara").attr("value"));
                var c = parseFloat($("#cPara").attr("value"));
                //var xUV = eval($("#xPara").val());
                //var yUV = eval($("#yPara").val());
                //var zUV = eval($("#zPara").val());


                var pos = function (u, v) {
                    try {
                        return {
                            x: eval($("#xPara").attr("value")),
                            y: eval($("#yPara").attr("value")),
                            z: eval($("#zPara").attr("value"))
                        }
                    } catch (err) {
                        console.log("xUV || yUV || zUV --> Formel wurde falsch eingegeben (Wurde vllt 'Math.' " +
                            "vergessen?! Standardformel einer Kugel wird genutzt.\n" +
                            "x: a * Math.cos(u) * Math.sin(v),\n" +
                            "y: b * Math.sin(u) * Math.sin(v),\n" +
                            "z: c * Math.cos(v) ");
                        return {
                            x: a * Math.cos(u) * Math.sin(v),
                            y: b * Math.sin(u) * Math.sin(v),
                            z: c * Math.cos(v)
                        }

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
                var bufferGeometryParametricSurface = getBufferGeometry();

                bufferGeometryParametricSurface.addAttribute("position", parametricSurface.getPositions());
                bufferGeometryParametricSurface.addAttribute("color", parametricSurface.getColors());

                scene.addBufferGeometry(bufferGeometryParametricSurface);

            }));
            $("#btnNewDinis").click((function () {
                var a = parseFloat($("#aDinis").attr("value"));
                var b = parseFloat($("#bDinis").attr("value"));

                var pos = function (u, v) {
                    return {
                        x: a * Math.cos(u) * Math.sin(v),
                        y: a * Math.sin(u) * Math.sin(v),
                        z: a * (Math.cos(v) + Math.log(Math.tan(v / 2))) + b * u
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

                var dinis = new ParametricSurface(pos, config);
                var bufferGeometryDinis = getBufferGeometry();

                bufferGeometryDinis.addAttribute("position", dinis.getPositions());
                bufferGeometryDinis.addAttribute("color", dinis.getColors());
                scene.addBufferGeometry(bufferGeometryDinis);
            }));
            $("#btnNewTranguloidTrefoil").click((function () {

                var pos = function (u, v) {
                    return {
                        x: 2 * Math.sin(3 * u) / (2 + Math.cos(v)),
                        y: 2 * (Math.sin(u) + 2 * Math.sin(2 * u)) / (2 + Math.cos(v + 2 * Math.PI / 3)),
                        z: (Math.cos(u) - 2 * Math.cos(2 * u)) * (2 * Math.cos(v)) *
                        (2 + Math.cos(v + 2 * Math.PI / 3)) / 4
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

                var tranguloid = new ParametricSurface(pos, config);
                var bufferGeometryTranguloid = getBufferGeometry();

                bufferGeometryTranguloid.addAttribute("position", tranguloid.getPositions());
                bufferGeometryTranguloid.addAttribute("color", tranguloid.getColors());

                scene.addBufferGeometry(bufferGeometryTranguloid);
            }));
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
                var bufferGeometryEllipsoid = getBufferGeometry();

                bufferGeometryEllipsoid.addAttribute("position", ellipsoid.getPositions());
                bufferGeometryEllipsoid.addAttribute("color", ellipsoid.getColors());

                scene.addBufferGeometry(bufferGeometryEllipsoid);
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
                var bufferGeometryEllipsoid = getBufferGeometry();

                bufferGeometryEllipsoid.addAttribute("position", ellipsoid.getPositions());
                bufferGeometryEllipsoid.addAttribute("color", ellipsoid.getColors());

                scene.addBufferGeometry(bufferGeometryEllipsoid);
            }));
            $("#btnNewCustomRandom").click((function () {

                var numPoints = parseInt($("#numItemsCustomRandom").attr("value"));
                var triangleSize = parseInt($("#customRandomSize").attr("value"));

                var customRandom = new Random_Triangle(numPoints, triangleSize);
                var bufferGeometryCustomRandom = getBufferGeometry();

                bufferGeometryCustomRandom.addAttribute("position", customRandom.getPositions());
                bufferGeometryCustomRandom.addAttribute("normal", customRandom.getNormals());
                bufferGeometryCustomRandom.addAttribute("color", customRandom.getColors());

                scene.addBufferGeometry(bufferGeometryCustomRandom);
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

            $("#btnRemoveObj").click((function () {
                scene.removeBufferGeogemtry();
            }));

            var getBufferGeometry = function () {
                if ($("#matPoint").attr('checked') || $("#matLine").attr('checked') ||
                    $("#matTriangle").attr('checked')) {

                    var bufferGeometry;

                    if ($("#matPoint").attr('checked') && !( $("#matLine").attr('checked') ||
                        $("#matTriangle").attr('checked') )) {
                        bufferGeometry = new BufferGeometry();
                    } else if ($("#matLine").attr('checked') && !( $("#matPoint").attr('checked') ||
                        $("#matTriangle").attr('checked') )) {
                        bufferGeometry = new BufferLineGeometry();
                    } else if ($("#matTriangle").attr('checked') && !( $("#matLine").attr('checked') ||
                        $("#matPoint").attr('checked') )) {
                        bufferGeometry = new BufferTriangleGeometry();
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

                    return bufferGeometry;

                } else {
                    //return a PointBufferGeometry
                    console.log("POINTBufferGeometry");
                    return new BufferGeometry();
                }
            }

        };

        // return the constructor function
        return HtmlController;

    }))
; // require



            
