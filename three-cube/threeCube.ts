import {h, Projector, createProjector} from "../vendor/maquette/maquette";
import request from 'dojo-core/request';
import widget3D = require('./widget3D');

var projector: Projector;

function setProjector(newProjector: Projector) {
	projector = newProjector;
}

var colorString = 'green';

function parseColor(input): number {
	var div = document.createElement('div');
	div.style.color = input;
	let m = getComputedStyle(div).color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
	if ( m ) {
		return parseInt(m[1]) * 256 * 256 + parseInt(m[2]) * 256 + parseInt(m[3]);
	} else {
		throw new Error('Color ' + input + ' could not be parsed.');
	}
}

function handleColorInput(evt) {
	colorString = evt.target.value;
	try {
		widget3D.setColor(parseColor(colorString));
		// console.log('new color value', widget3D.colorValue);
	} catch (e) {
		// console.log('Bad color', colorString);
	}
}

// Return three random numbers in data field as JSON, like:
// {"type":"uint8","length":3,"data":[29,34,166],"success":true}
// CORS issue with: var randomNumberURL = 'http://qrng.anu.edu.au/API/jsonI.php?length=3&type=uint8';
var randomNumberURL = 'randomColor.json';

function requestColor(ev?: MouseEvent): boolean {
	console.log('request color clicked');
	request(randomNumberURL).then(function (response) {
		var data = JSON.parse(<any>response.data).data;
		var colorValue = data[0] * 256 * 256 + data[1] * 256 + data[2];
		// Introduce artificial delay to ensure scene will not be rerendered immediately
		setTimeout(function() {
			widget3D.setColor(colorValue);
			colorString = 'rgb(' + data[0] + ',' + data[1] + ', ' + data[2] + ')';
			projector.scheduleRender();
		}, 1000);
	});
	return true;
}

function stringForColorValue() {
	var result = widget3D.getColor().toString(16);
	while (result.length < 6) {
		result = '0' + result;
	}
	return result;
}

function renderMaquette() {
	return h('div', [
		h('p', {}, 'Experiment #3'),
		'Color:',
		h('input', {
			type: 'test',
			placeholder: 'Enter a color?',
			value: colorString,
			oninput: handleColorInput
		}),
		h('p.output', [
			'Color value: ' + stringForColorValue(),
			h('div', {style: "width: 20px; height: 20px; background-color:#" + stringForColorValue()})
		]),
		h('button', {
			onclick: requestColor
		}, 'Request color'),
		h('div.threeD', {
			// style: {'border-width': '20px'},
			afterCreate: widget3D.setup
		})
	])
}

var projector = createProjector({});
setProjector(projector);
projector.append(document.body, renderMaquette);
