/* global m */
import "../vendor/mithril.js"
const h = m

import * as widget3D from "./widget3D.js"

var colorString = "rgb(10, 200, 10)"

function parseColor(input) {
	let value = input.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i)
    if ( value ) {
		return Math.min(255, parseInt(value[1])) * 256 * 256 + Math.min(255, parseInt(value[2])) * 256 + Math.min(255, parseInt(value[3]))
	} else {
		throw new Error("Color " + input + " could not be parsed.")
	}
}

function handleColorInput(evt) {
	colorString = evt.target.value
	try {
		widget3D.setColor(parseColor(colorString))
		// console.log("new color value", widget3D.colorValue)
	} catch (e) {
		// console.log("Bad color", colorString, e)
	}
}

// Return three random numbers in data field as JSON, like:
// {"type":"uint8","length":3,"data":[29,34,166],"success":true}
// CORS issue with: var randomNumberURL = "http://qrng.anu.edu.au/API/jsonI.php?length=3&type=uint8"
var randomNumberURL = "randomColor.json"

function requestColor() {
    console.log("request color clicked")
    m.request({url: randomNumberURL}).then(function(response) {
        const data = response.data
        console.log("Got data", data)
        var colorValue = data[0] * 256 * 256 + data[1] * 256 + data[2]
		// Introduce artificial delay to ensure scene will not be rerendered immediately
		setTimeout(function() {
			widget3D.setColor(colorValue)
			colorString = "rgb(" + data[0] + "," + data[1] + ", " + data[2] + ")"
			m.redraw()
        }, 1000)
	}, function (error) {
		console.log("Something went wrong", error)
    })
	return true
}

function stringForColorValue() {
	var result = widget3D.getColor().toString(16)
	while (result.length < 6) {
		result = "0" + result
	}
	return result
}

function view() {
	return h("div", [
		h("p", {}, "Experiment #3"),
		"Color:",
		h("input", {
			type: "test",
			placeholder: "Enter a color?",
			value: colorString,
			oninput: handleColorInput
		}),
		h("p.output", [
			"Color value: " + stringForColorValue(),
			h("div", {style: "width: 20px; height: 20px; background-color:#" + stringForColorValue()})
		]),
		h("button", {
			onclick: requestColor
		}, "Request color"),
		h("div.threeD", {
			// style: {"border-width": "20px"},
			oncreate: vnode => widget3D.setup(vnode.dom)
		})
	])
}

m.mount(document.body, {view})
