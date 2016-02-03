/* requireJS module definition */
define(["jquery", "three"],
    (function ($, THREE) {

        "use strict";

        var Environment = function () {


            this.root = new THREE.Object3D();

            var scope = this;


            //var loader = new THREE.TextureLoader();
            //var envMap = loader.load('textures/env/20060121-06_hd.jpg',
            //    function(texture){  //success
            //        return texture
            //    },
            //    function(xhr){      //loaded
            //        console.log( (xhr.loaded / xhr.total * 100) +" % loaded" );
            //    },
            //    function(xhr){      //error
            //        console.log( "An error happened.." );
            //    }
            //);
            //
            //var skyMap = new THREE.MeshLambertMaterial( {
            //    color: 0xffffff,
            //    envMap: envMap
            //} );

            var urls = [
                'textures/env/2_right.PNG',
                'textures/env/2_left.PNG',
                'textures/env/2_top.PNG',
                'textures/env/2_bottom.PNG',
                'textures/env/2_front.PNG',
                'textures/env/2_back.PNG'
            ];

            var loader = new THREE.CubeTextureLoader();
            var cubemap = loader.load(urls,
                function (texture) {  //success
                    return texture
                },
                function (xhr) {      //loaded
                    console.log((xhr.loaded / xhr.total * 100) + " % loaded");
                },
                function (xhr) {      //error
                    console.log("An error happened..");
                }
            );

            cubemap.format = THREE.RGBFormat;

            var shader = THREE.ShaderLib["cube"];
            shader.uniforms["tCube"].texture = cubemap;

            var material = new THREE.ShaderMaterial({

                fragmentShader: shader.fragmentShader,
                vertexShader: shader.vertexShader,
                uniforms: shader.uniforms,
                depthWrite: false,
                side: THREE.BackSide

            });
            var skybox = new THREE.Mesh(new THREE.CubeGeometry(1000, 1000, 1000), material);
            scope.mesh = skybox;
            scope.mesh.name = "environment";
            scope.root.add(scope.mesh);

            var reflectionMaterial = new THREE.MeshBasicMaterial({
                color: 0xcccccc,
                envMap: cubemap
            });

            var torus = new THREE.Mesh(
                new THREE.TorusKnotGeometry(150, 50, 80),
                reflectionMaterial
            );
            scope.mesh = torus;
            scope.mesh.name = "torus";
            scope.root.add(torus);

            this.getMesh = function () {
                return this.root;
            };


        }; // constructor


        return Environment;

    })); // define module


//var SAMPLE = (function() {
//
//    // create and set up the scene, etc
//    var width = window.innerWidth;
//    var height = window.innerHeight;
//    var scene = new THREE.Scene();
//    var camera = new THREE.PerspectiveCamera(35, width / height, 1, 1500);
//    var renderer = new THREE.WebGLRenderer({antialias:true});
//    var time = 0;
//    var ORIGIN = new THREE.Vector3();
//
//    // urls of the images,
//    // one per half axis
//    var urls = [
//        'canary/pos-x.png',
//        'canary/neg-x.png',
//        'canary/pos-y.png',
//        'canary/neg-y.png',
//        'canary/pos-z.png',
//        'canary/neg-z.png'
//    ];
//
//    // wrap it up into the object that we need
//    var cubemap = THREE.ImageUtils.loadTextureCube(urls);
//
//    // set the format, likely RGB
//    // unless you've gone crazy
//    cubemap.format = THREE.RGBFormat;
//
//    // following code from https://github.com/mrdoob/three.js/blob/master/examples/webgl_materials_cubemap.html
//    var shader = THREE.ShaderLib[ "cube" ];
//    shader.uniforms[ "tCube" ].texture = cubemap;
//
//    var material = new THREE.ShaderMaterial( {
//
//        fragmentShader: shader.fragmentShader,
//        vertexShader: shader.vertexShader,
//        uniforms: shader.uniforms,
//        depthWrite: false,
//        side: THREE.BackSide
//
//    });
//
//    var skybox = new THREE.Mesh( new THREE.CubeGeometry( 1000, 1000, 1000 ), material );
//
//    var ambient = new THREE.AmbientLight( 0xffffff );
//    scene.add(ambient);
//
//    var pointLight = new THREE.PointLight( 0xffffff, 2 );
//    scene.add( pointLight );
//
//    var reflectionMaterial = new THREE.MeshBasicMaterial({
//        color: 0xcccccc,
//        envMap: cubemap
//    });
//
//    var torus = new THREE.Mesh(
//        new THREE.TorusKnotGeometry(60,20,100),
//        reflectionMaterial
//    );
//
//    scene.add(torus);
//    scene.add(camera);
//    scene.add(skybox);
//
//    renderer.setSize(width, height);
//    document.body.appendChild(renderer.domElement);
//
//    function animate() {
//
//        time += 0.005;
//
//        camera.position.x = Math.sin(time) * 400;
//        camera.position.z = Math.cos(time) * 400;
//        camera.lookAt(ORIGIN);
//
//        renderer.render(scene,camera);
//        requestAnimationFrame(animate);
//    }
//
//    requestAnimationFrame(animate);
//
//})();
