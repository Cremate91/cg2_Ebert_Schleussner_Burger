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
define(["jquery", "BufferGeometry", "random", "band", "parametricSurface", "ellipsoid_withObjFilling",
        "random_Triangle", "robot", "explosion", "planet"],
    (function ($, BufferGeometry, Random, Band, ParametricSurface, Ellipsoid_withObjFilling,
               Random_Triangle, Robot, Explosion, Planet) {
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
            $("#robot").hide();
            $("#material").show();
            $("#explosion").hide();
            $("#planet").hide();

            $("#btnRandom").click((function () {
                $("#random").show();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#dinisSurface").hide();
                $("#tranguloidTrefoil").hide();
                $("#ellipsoidWithFill").hide();
                $("#ellipsoid").hide();
                $("#customRandom").hide();
                $("#robot").hide();
                $("#material").show();
                $("#explosion").hide();
                $("#planet").hide();
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
                $("#robot").hide();
                $("#material").show();
                $("#explosion").hide();
                $("#planet").hide();
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
                $("#robot").hide();
                $("#material").show();
                $("#explosion").hide();
                $("#planet").hide();
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
                $("#robot").hide();
                $("#material").show();
                $("#explosion").hide();
                $("#planet").hide();
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
                $("#robot").hide();
                $("#material").show();
                $("#explosion").hide();
                $("#planet").hide();
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
                $("#robot").hide();
                $("#material").show();
                $("#explosion").hide();
                $("#planet").hide();
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
                $("#robot").hide();
                $("#material").show();
                $("#explosion").hide();
                $("#planet").hide();
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
                $("#robot").hide();
                $("#material").show();
                $("#explosion").hide();
                $("#planet").hide();
            }));
            $("#btnRobot").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#dinisSurface").hide();
                $("#tranguloidTrefoil").hide();
                $("#ellipsoidWithFill").hide();
                $("#ellipsoid").hide();
                $("#customRandom").hide();
                $("#robot").show();
                $("#material").hide();
                $("#explosion").hide();
                $("#planet").hide();
            }));
            $("#btnExplosion").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#dinisSurface").hide();
                $("#tranguloidTrefoil").hide();
                $("#ellipsoidWithFill").hide();
                $("#ellipsoid").hide();
                $("#customRandom").hide();
                $("#robot").hide();
                $("#material").hide();
                $("#explosion").show();
                $("#planet").hide();
            }));
            $("#btnPlanet").click((function () {
                $("#random").hide();
                $("#band").hide();
                $("#parametricSurface").hide();
                $("#dinisSurface").hide();
                $("#tranguloidTrefoil").hide();
                $("#ellipsoidWithFill").hide();
                $("#ellipsoid").hide();
                $("#customRandom").hide();
                $("#robot").hide();
                $("#material").hide();
                $("#explosion").hide();
                $("#planet").show();
            }));

            $("#btnNewExplosion").click((function () {

                var explosion = new Explosion(scene);
                scene.addBufferGeometry(explosion);

            }));

            $("#btnNewPlanet").click((function () {

                var planet = new Planet();
                scene.addBufferGeometry(planet);

            }));
            $("#btnNewRandom").click((function () {

                var numPoints = parseInt($("#numItems").attr("value"));

                var random = new Random(numPoints);
                var bufferGeometryRandom = getBufferGeometry(random);

                scene.addBufferGeometry(bufferGeometryRandom);
            }));
            $("#btnNewBand").click((function () {

                var config = {
                    segments: parseInt($("#numSegments").attr("value")),
                    radius: parseInt($("#radius").attr("value")),
                    height: parseInt($("#height").attr("value"))
                };

                var band = new Band(config);
                var bufferGeometryBand = getBufferGeometry(band);

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
                var bufferGeometryParametricSurface = getBufferGeometry(parametricSurface);

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
                var bufferGeometryDinis = getBufferGeometry(dinis);

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
                var bufferGeometryTranguloid = getBufferGeometry(tranguloid);

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
                var bufferGeometryEllipsoid = getBufferGeometry(ellipsoid);

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
                var bufferGeometryEllipsoid = getBufferGeometry(ellipsoid);

                scene.addBufferGeometry(bufferGeometryEllipsoid);
            }));
            $("#btnNewCustomRandom").click((function () {

                var numPoints = parseInt($("#numItemsCustomRandom").attr("value"));
                var triangleSize = parseInt($("#customRandomSize").attr("value"));

                var customRandom = new Random_Triangle(numPoints, triangleSize);
                var bufferGeometryCustomRandom = getBufferGeometry(customRandom);

                scene.addBufferGeometry(bufferGeometryCustomRandom);
            }));
            $("#btnNewRobot").click((function () {
                var robo = new Robot();
                scene.addBufferGeometry(robo);
            }));

            $('#freqScale').addEventListener("keydown", expolosionUpdate, false);
            $('#colorScale').addEventListener("keydown", expolosionUpdate, false);
            $('#weight').addEventListener("keydown", expolosionUpdate, false);

            function expolosionUpdate(event){
                var keyCode = event.which;
                if(keyCode == 13){
                    var freqScale = parseFloat($("#freqScale").attr("value"));
                    var colScale = parseFloat($("#colorScale").attr("value"));
                    var weight = parseFloat($("#weight").attr("value"));
                    console.log("Frequency Scale : " + freqScale);
                    console.log("Color Scale     : " + colScale);
                    console.log("Weight          : " + weight);

                    scene.explosionUpdate(weight, colScale, freqScale);
                }
            }

            $('#texDay').click((function () {
                textureUpdate();
            }));
            $('#texNight').click((function () {
                textureUpdate();
            }));
            $('#cloud').click((function () {
                textureUpdate();
            }));
            $('#texTopo').click((function () {
                textureUpdate();
            }));

            var textureUpdate = function () {
                scene.textureUpdate(isDayTex(), isNightTex(), isClouds(), isTopo());
            };

            var isDayTex = function () {
                return !!$('#texDay').attr('checked');
            };

            var isNightTex = function () {
                return !!$('#texNight').attr('checked');
            };

            var isClouds = function () {
                return !!$('#cloud').attr('checked');
            };

            var isTopo = function () {
                return !!$('#texTopo').attr('checked');
            };

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

            var getBufferGeometry = function (geo) {

                var bufferGeometry;

                if (isPoint() || isLine() ||
                    isTriangle() || isSolid() || isWireframe()) {


                    if (isPoint() && !( isLine() || isTriangle() || isSolid() || isWireframe() )) {
                        bufferGeometry = new BufferGeometry(true, false, false, false, false);
                    } else if (isLine() && !( isPoint() || isTriangle() || isSolid() || isWireframe() )) {
                        bufferGeometry = new BufferGeometry(false, true, false, false, false);
                    } else if (isTriangle() && !( isLine() || isPoint() || isSolid() || isWireframe() )) {
                        if ((geo instanceof Random_Triangle)
                            || (geo instanceof Ellipsoid_withObjFilling)
                            || (geo instanceof Random)) {
                            bufferGeometry = new BufferGeometry(false, false, true, false, false);
                            //bufferGeometry.addAttribute("normal", geo.getNormals()); // für Random_Triangle
                        } else {
                            alert("Dieses Material ist für diese Geometrie nicht dacht!");
                        }
                    } else if (isSolid() && !( isLine() || isTriangle() || isPoint() || isWireframe() )) {
                        if ((geo instanceof ParametricSurface) || (geo instanceof Band)) {
                            bufferGeometry = new BufferGeometry(false, false, false, true, false);
                            bufferGeometry.setIndex(geo.getIndices());
                        } else {
                            alert("Dieses Material ist für diese Geometrie nicht dacht!");
                        }
                    } else if (isWireframe() && !( isLine() || isTriangle() || isPoint() || isSolid() )) {
                        if ((geo instanceof ParametricSurface) || (geo instanceof Band)) {
                            bufferGeometry = new BufferGeometry(false, false, false, false, true);
                            bufferGeometry.setIndex(geo.getIndices());
                        } else {
                            alert("Dieses Material ist für diese Geometrie nicht dacht!");
                        }
                    } else if (isWireframe() && isSolid() && !( isLine() || isTriangle() || isPoint() )) {
                        if ((geo instanceof ParametricSurface) || (geo instanceof Band)) {
                            bufferGeometry = new BufferGeometry(false, false, false, true, true);
                            bufferGeometry.setIndex(geo.getIndices());
                        } else {
                            alert("Dieses Material ist für diese Geometrie nicht dacht!");
                        }


                        /**
                         * alle Materialien können einzeln ausgeführt werden
                         *
                         * --> alles weitere noch nicht
                         */

                    } else {
                        // drei Materialien wurden ausgewählt
                        alert("Diesen Feature ist zur Zeit noch nicht verfügbar.");
                        console.log("mehrere Materialien wurden ausgewählt");
                    }

                    bufferGeometry.addAttribute("position", geo.getPositions());
                    bufferGeometry.addAttribute("color", geo.getColors());

                    return bufferGeometry;

                } else {
                    //return a PointBufferGeometry
                    console.log("POINTBufferGeometry");
                    bufferGeometry = new BufferGeometry(true, false, false, false, false);
                    bufferGeometry.addAttribute("position", geo.getPositions());
                    bufferGeometry.addAttribute("color", geo.getColors());
                    return bufferGeometry;
                }
            };

            var isPoint = function () {
                return !!$("#matPoint").attr('checked');
            };

            var isLine = function () {
                return !!$("#matLine").attr('checked');
            };

            var isTriangle = function () {
                return !!$("#matTriangle").attr('checked');
            };

            var isSolid = function () {
                return !!$("#matSolid").attr('checked');
            };

            var isWireframe = function () {
                return !!$('#wireframe').attr('checked');
            };

            // return the constructor function
        }

        return HtmlController;

    })); // require



            
