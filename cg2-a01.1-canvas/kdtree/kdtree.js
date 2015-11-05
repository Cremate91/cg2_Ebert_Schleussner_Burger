/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: kdtree
 *
 *
 */


/* requireJS module definition */
define(["kdutil", "vec2", "Scene", "KdNode", "BoundingBox"],
    function (KdUtil, vec2, Scene, KdNode, BoundingBox) {

        "use strict";

        /**
         * Creates a kd-tree. The build function is directly called
         * on generation
         *
         * @param pointList
         * @constructor
         */
        var KdTree = function (pointList) {

            /**
             *
             * @param pointList - list of points
             * @param dim       - current axis
             * @param parent    - current parent (starts with root)
             * @param isLeft    - flag if node is left or right child of its parent
             * @returns returns root node after tree is build
             */
            this.build = function (pointList, dim, parent, isLeft) {

                //console.log(pointList.length);
                // IMPLEMENT!
                // create new node
                if (pointList.length > 0) {
                    var node = new KdNode(dim);
                    //console.log("node erstellt..")
                } else {
                    return null;
                }

                // find posInArray position in pointList
                var posInArray = KdUtil.median(pointList, dim);

                // compute next axis
                var nextDim = (dim === 0) ? 1 : 0;

                // set point in node
                node.point = pointList[posInArray];

                // compute bounding box for node
                // check if node is root (has no parent)
                //
                // take a look in findNearestNeighbor why we
                // need this bounding box!
                if (!parent) {
                    // Note: hardcoded canvas size here
                    node.bbox = new BoundingBox(0, 0, 500, 400, node.point, dim);
                } else {
                    // create bounding box and distinguish between axis and
                    // which side (left/right) the node is on
                    if (dim == 1) {
                        if (isLeft) {
                            node.bbox = new BoundingBox(parent.bbox.xmin, parent.bbox.ymin, parent.point.center[0], parent.bbox.ymax, node.point, dim);
                            //console.log("dim: 1, links, waagerecht");
                        } else {
                            node.bbox = new BoundingBox(parent.point.center[0], parent.bbox.ymin, parent.bbox.xmax, parent.bbox.ymax, node.point, dim);
                            //console.log("dim: 1, rechts, waagerecht");
                        }
                    } else {
                        if (isLeft) {
                            node.bbox = new BoundingBox(parent.bbox.xmin, parent.bbox.ymin, parent.bbox.xmax, parent.point.center[1], node.point, dim);
                            //console.log("dim: 0, links, senkrecht");
                        } else {
                            node.bbox = new BoundingBox(parent.bbox.xmin, parent.point.center[1], parent.bbox.xmax, parent.bbox.ymax, node.point, dim);
                            //console.log("dim: 0, rechts, senkrecht");
                        }
                    }

                }

                // create point list left/right and
                // call build for left/right arrays
                var leftPoints = pointList.slice(0, posInArray);
                var rightPoints = pointList.slice(posInArray + 1, pointList.length);

                node.leftChild = this.build(leftPoints, nextDim, node, true);
                node.rightChild = this.build(rightPoints, nextDim, node, false);
                return node;
            };

            /**
             * Given a query point the function return its nearest neighbor by traversing
             * down the tree
             *
             * @param node - current tree node
             * @param query - query node
             * @param nearestDistance - current nearest distance to query node
             * @param currentBest - current best/nearest node to query node
             * @param dim - current axis (x or y)
             * @returns closest tree node to query node
             */
            this.findNearestNeighbor = function (node, query, nearestDistance, currentBest, dim) {

                if (!node) {
                    return currentBest;
                }

                var closest = currentBest;
                var closestDistance = nearestDistance;

                var dist = KdUtil.distance(node.point.center, query.center);
                if (dist < nearestDistance) {
                    closestDistance = dist;
                    closest = node;
                }

                var first, second;
                if (dim == 0) {
                    if (query.center[0] < node.point.center[0]) {
                        first = node.leftChild;
                        second = node.rightChild;
                    } else {
                        first = node.rightChild;
                        second = node.leftChild;
                    }
                } else {
                    if (query.center[1] < node.point.center[1]) {
                        first = node.leftChild;
                        second = node.rightChild;
                    } else {
                        first = node.rightChild;
                        second = node.leftChild;
                    }
                }

                var nextDim = (dim === 0) ? 1 : 0;
                if (first && first.bbox.distanceTo(query.center) < closestDistance) {
                    closest = this.findNearestNeighbor(first, query, closestDistance, closest, nextDim);
                    closestDistance = KdUtil.distance(closest.point.center, query.center);
                }

                if (second && second.bbox.distanceTo(query.center) < closestDistance) {
                    closest = this.findNearestNeighbor(second, query, closestDistance, closest, nextDim);
                }

                return closest;
            };



            //console.log("erst rootbuild");
            this.root = this.build(pointList, 0);
            console.log(" this is the root: ", this.root);

        };

        return KdTree;


    }); // define


