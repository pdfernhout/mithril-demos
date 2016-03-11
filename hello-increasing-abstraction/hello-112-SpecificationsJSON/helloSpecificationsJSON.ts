import maquette = require("../../vendor/maquette/maquette");
import dojoString = require("dojo-core/string");
import request from "dojo-core/request";

let h = maquette.h;
let projector = maquette.createProjector({});

var specifications = null;

interface Specification {
	type: string;
	text: string;
	extra?: string;
}

// Convert marked-up words like _this and *that* to HyperScript calls.
// Convert words with a pipe (|) in them into hyperlinks.
// For demonstration putposes only -- this is not a robust approach to markup.
function convertMarkupToHyperScript(text) {
	function removeMarkup(text: string) {
		if (text.charAt(0) !== text.charAt(text.length - 1)) {
			throw new Error("Unmatched markup for: " + text);
		}
		return text.substring(1, text.length - 1);
	}

	let parts = text.split(/(\s+|[,.;?!](?=\s))/g);

	let newParts = parts.map((part: string): any => {
		if (dojoString.startsWith(part, "_")) return h("em", {}, removeMarkup(part));
		if (dojoString.startsWith(part, "*")) return h("span.special-text", {}, removeMarkup(part));
		if (part.indexOf('|') !== -1) {
			let sections = part.split('|');
			return h("a", { "href": sections[1] }, [sections[0]])
		}
		return part;
	});
	return newParts;
}

function renderText(specification: Specification) {
	return h("div", {key: specification}, [convertMarkupToHyperScript(specification.text)]);
}

function renderImage(specification: Specification) {
	return h("div#image-div", {key: specification}, [
		h("img", { "src": specification.extra, "alt": convertMarkupToHyperScript(specification.text) } )
	]);
}

function renderComment(specification: Specification) {
	// Added a key here so Maquette can track changes to comments
	return h("div.comment", {key: specification}, [
		convertMarkupToHyperScript(specification.text),
		specification.extra ? h("blockquote", {}, convertMarkupToHyperScript(specification.extra)) : [ ]
	]);
}

let specificationToRenderingFunctionMap = {
	"text": renderText,
	"image": renderImage,
	"comment": renderComment
}

function renderSpecification(specification) {
	let renderingFunction = specificationToRenderingFunctionMap[specification.type];
	return renderingFunction(specification);
}

function renderSpecifications() {
	return specifications.map((specification) => {
		return renderSpecification(specification);
	})
}

function renderMaquette() {
	return h("div", { id: "hello-demo" },
		specifications ?
			renderSpecifications() :
			h("div.loading", { key: "loading" }, "Loading specifications. Please wait...")
	);
}

function loadSpecifications() {
	request("specifications.json", { handleAs: 'json' }).then(function(response) {
		console.log("Got response", response);
		specifications = response.data;
		// Try commenting out the next line to see what happens (or doesn't happen)
		projector.scheduleRender();
	}, function (error) {
		console.log("Something went wrong", error);
	});
}

loadSpecifications();
projector.append(document.body, renderMaquette);
