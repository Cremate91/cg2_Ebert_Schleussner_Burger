/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: BufferGeometry
 *
 * BufferGeometry Vertex-Arrays and Vertex-Attributes
 * stored in float32 arrays for the given attributes.
 * In our cases we assume all attributes have
 * numItems*3 size e.g. position (x, y, z), color (r, g, b)
 *
 * BufferGeometry is (at least for now) used to render Points with
 * vertexcolors.
 * Therefore we add a point material (THREE.PointsMaterial) and point container (THREE.Points).
 *
 */

/* requireJS module definition */
define(["three"],
    (function (THREE) {

        "use strict";

        var BufferGeometry = function (point, line, triangle, solid, wf) {

            this.isPoint = point || false;
            this.isLine = line || false;
            this.isTriangle = triangle || false;
            this.isSolid = solid || false;
            this.isWireframe = wf || false;

            this.mesh = undefined;
            this.geometry = new THREE.BufferGeometry();


            /**
             * Adds a vertex attribute, we assume each element has three components, e.g.
             * [position_x0, position_y0, position_z0, position_x1, position_y1, position_z1,...]
             * AddAttribute updates the mesh.
             *
             * @param name vertex attributes name, e.g. position, color, normal
             * @param buffer
             */
            this.addAttribute = function (name, buffer) {
                this.geometry.addAttribute(name, new THREE.BufferAttribute(buffer, 3));
                this.geometry.computeBoundingSphere();
                this.mesh = this.setMesh(this.geometry);
            }

            this.getMesh = function () {
                return this.mesh;
            }

            this.setIndex = function (indices) {
                this.geometry.setIndex(new THREE.BufferAttribute(indices, 1));
            }

            this.setMesh = function (geo) {
                if (this.isPoint) {
                    var mat = new THREE.PointsMaterial({
                        color: 0xaaaaaa,
                        size: 10, vertexColors: THREE.VertexColors
                    });
                    return new THREE.Points(geo, mat);
                } else if (this.isLine) {
                    var mat = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors});
                    return new THREE.Line(geo, mat);
                } else if (this.isTriangle) {
                    var mat = new THREE.MeshPhongMaterial({
                        color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
                        side: 2, vertexColors: THREE.VertexColors
                    });
                    return new THREE.Mesh(geo, mat);
                } else if (this.isSolid && !this.isWireframe) {
                    var mat = new THREE.MeshLambertMaterial({color: 0x2194ce, emissive: 0x000000, side: 2});
                    return new THREE.Mesh(geo, mat);
                } else if (this.isWireframe && !this.isSolid) {
                    var mat = new THREE.MeshLambertMaterial({color: 0x0000ff, wireframe: true});
                    return new THREE.Mesh(geo, mat);
                }else if(this.isWireframe && this.isSolid){
                    var materials = [
                        new THREE.MeshLambertMaterial({color: 0xcc0000, emissive: 0x000000, side: 2}),
                        new THREE.MeshLambertMaterial({color: 0x000000, wireframe: true})
                    ];
                    return new THREE.SceneUtils.createMultiMaterialObject(geo, materials);
                } else {
                    return new THREE.PointsMaterial({
                        color: 0xaaaaaa,
                        size: 10, vertexColors: THREE.VertexColors
                    });
                }
            }
        };

        return BufferGeometry;
    }));
