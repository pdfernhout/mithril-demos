import maquette = require("../../vendor/maquette/maquette");
import dojoString = require("dojo-core/string");
import specifications = require("./specifications");

let h = maquette.h;
let projector = maquette.createProjector({});

// Convert marked-up words like _this_ and *that* to HyperScript calls.
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

function renderText(text: string, extra?: string) {
	return h("div", [convertMarkupToHyperScript(text)]);
}

function renderImage(alt: string, src: string) {
	return h("div#image-div", [
		h("img", { "src": src, "alt": convertMarkupToHyperScript(alt) } )
	]);
}

function renderComment(text: string, quote?: string) {
	return h("div.comment", [
		convertMarkupToHyperScript(text),
		quote ? h("blockquote", {}, convertMarkupToHyperScript(quote)) : [ ]
	]);
}

let specificationToRenderingFunctionMap = {
	"text": renderText,
	"image": renderImage,
	"comment": renderComment
}

function renderSpecification(specification) {
	let renderingFunction = specificationToRenderingFunctionMap[specification.type];
	return renderingFunction(specification.text, specification.extra);
}

function renderMaquette() {
	return h("div", { id: "hello-demo" },
		specifications.map((specification) => {
			return renderSpecification(specification);
		})
	);
}

projector.append(document.body, renderMaquette);
