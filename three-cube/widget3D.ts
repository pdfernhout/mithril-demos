// Derived from: http://threejs.org/docs/#Manual/Introduction/Creating_a_scene

import THREE = require('three');

// set the scene size
var WIDTH = 300;
var HEIGHT = 300;

// set some camera attributes
var VIEW_ANGLE = 45;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 0.1;
var FAR = 10000;

var color = 0x00ff00;

var cube;

export function getColor(): number {
	return color;
}

export function setColor(theColor: number) {
	color = theColor;
	cube.material.color.setHex(color);
}

export function setup(containerNode) {
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, WIDTH / HEIGHT, 0.1, 1000 );

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( WIDTH, HEIGHT );
	renderer.setClearColor( 0xffffff, 0);

	containerNode.appendChild( renderer.domElement );

	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: color } );
	cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	camera.position.z = 5;

	var render = function () {
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		renderer.render(scene, camera);

		requestAnimationFrame( render );
	};

	render();
}
