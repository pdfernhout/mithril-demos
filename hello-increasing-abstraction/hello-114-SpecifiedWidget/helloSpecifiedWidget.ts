import maquette = require("../../vendor/maquette/maquette");
import dojoString = require("dojo-core/string");
import request from "dojo-core/request";

let h = maquette.h;

let eventHandlerInterceptor = function(propertyName: string, functionPropertyArgument: Function, domNode: Node, properties: maquette.VNodeProperties) {
  return function() {
	// intercept function calls (event handlers) to do a render afterwards.
	projector.scheduleRender();
	// TODO: bind is not defined on VNodeProperties
	return functionPropertyArgument.apply(properties["bind"], arguments);
  };
};

let projector = maquette.createProjector({ eventHandlerInterceptor: eventHandlerInterceptor });

class Specification {
	type: string;
	text: string;
	extra: string;
}

var specifications: Array<Specification> = null;
var widgets: Array<SpecifiedWidget> = null;

// Maquette requires always setting callbacks to the same function
// Use a SpecifiedWidget class that supports this to better document intent
class SpecifiedWidget implements maquette.Component {
	constructor(public specification: Specification) { };

	isEditing: boolean = false;

	setType(event) {
		console.log("setType", event);
		this.specification.type = event.target.value;
	}

	setText(event) {
		console.log("setText", event);
		this.specification.text = event.target.value;
	}

	setExtra(event) {
		console.log("setExtra", event);
		this.specification.extra = event.target.value;
	}

	editClicked() {
		console.log("editClicked", this);
		this.isEditing = true;
	}

	acceptChangesClicked() {
		console.log("acceptChangesClicked", this);
		this.isEditing = false;
	}

	renderEditor() {
		return h("div.editor", { key: this }, [
			"Type: ", h("input", { value: this.specification.type, onchange: this.setType, bind: this }), h("br"),
			"Text: ", h("input", { value: this.specification.text, onchange: this.setText, bind: this }), h("br"),
			"Extra: ", h("textarea", { value: this.specification.extra || "", onchange: this.setExtra, bind: this }), h("br"),
			h("button", { onclick: this.acceptChangesClicked, bind: this }, "Done")
		]);
	}

	renderMaquette() {
		return h("div.edit", { key: this }, [
			this.isEditing ?
				this.renderEditor() : [
					h("button", { onclick: this.editClicked, bind: this, style: "float: right;" }, "Edit"),
					renderSpecification(this.specification)
				]
		]);
	}
}

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

function renderSpecification(specification: Specification) {
	let renderingFunction = specificationToRenderingFunctionMap[specification.type];
	return renderingFunction(specification);
}

function renderSpecifiedWidgets() {
	return widgets.map((widget: SpecifiedWidget) => {
		return widget.renderMaquette();
	})
}

function renderMaquette() {
	return h("div", { id: "hello-demo" },
		specifications ?
			renderSpecifiedWidgets() :
			h("div.loading", { key: "loading" }, "Loading specifications. Please wait...")
	);
}

function loadSpecifications() {
	request("specifications.json", { handleAs: 'json' }).then(function(response) {
		console.log("Got response", response);
		specifications = <any>response.data;
		widgets = [];
		// Add updatign functions to specifications
		specifications.forEach(function (specification: Specification) {
			widgets.push(new SpecifiedWidget(specification));
		});
		// Try commenting out the next line to see what happens (or doesn't happen)
		projector.scheduleRender();
	}, function (error) {
		console.log("Something went wrong", error);
	});
}

projector.append(document.body, renderMaquette);
loadSpecifications();
