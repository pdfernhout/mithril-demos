/* global m */
import "../../vendor/mithril.js"
const h = m

// class Specification {
// 	type: string
// 	text: string
// 	extra: string
// }

var specifications = null
var widgets = null

// Wrap an editable specification in a class
class SpecifiedWidget {
	constructor(specification) { 
        this.specification = specification
        this.isEditing = false
    }

	setType(event) {
		console.log("setType", event)
		this.specification.type = event.target.value
	}

	setText(event) {
		console.log("setText", event)
		this.specification.text = event.target.value
	}

	setExtra(event) {
		console.log("setExtra", event)
		this.specification.extra = event.target.value
	}

	editClicked() {
		console.log("editClicked", this)
		this.isEditing = true
	}

	acceptChangesClicked() {
		console.log("acceptChangesClicked", this)
		this.isEditing = false
	}

	viewEditor() {
		return h("div.editor", { key: this }, [
			"Type: ", h("input", { value: this.specification.type, onchange: (event) => this.setType(event) }), h("br"),
			"Text: ", h("input", { value: this.specification.text, onchange: (event) => this.setText(event) }), h("br"),
			"Extra: ", h("textarea", { value: this.specification.extra || "", onchange: (event) => this.setExtra(event) }), h("br"),
			h("button", { onclick: () => this.acceptChangesClicked() }, "Done")
		])
	}

	view() {
		return h("div.edit", { key: this }, [
			this.isEditing ?
				this.viewEditor() : [
					h("button", { key: "edit-button", onclick: () => this.editClicked(), style: "float: right;" }, "Edit"),
					viewSpecification(this.specification)
				]
		])
	}
}

// Convert marked-up words like _this_ and *that* to HyperScript calls.
// Convert words with a pipe (|) in them into hyperlinks.
// For demonstration purposes only -- this is not a robust approach to markup.
function convertMarkupToHyperScript(text) {
    let parts = text.split(/(\s+|[,.;?!](?=\s))/g)
    console.log("convertMarkupToHyperScript", text)

	let newParts = parts.map((part) => {
		if (part.startsWith("_")) return h("em", {}, removeMarkup(part))
		if (part.startsWith("*")) return h("span.special-text", {}, removeMarkup(part))
		if (part.indexOf("|") !== -1) {
			let sections = part.split("|")
			return h("a", { "href": sections[1] }, [sections[0]])
		}
		return part
    })
    console.log("newParts", newParts)
	return newParts
}

function removeMarkup(text) {
    if (text.charAt(0) !== text.charAt(text.length - 1)) {
        throw new Error("Unmatched markup for: " + text)
    }
    return text.substring(1, text.length - 1)
}

function viewText(specification) {
	return h("div", {key: specification}, [convertMarkupToHyperScript(specification.text)])
}

function viewImage(specification) {
	return h("div#image-div", {key: specification}, [
		h("img", { "src": specification.extra, "alt": convertMarkupToHyperScript(specification.text) } )
	])
}

function viewComment(specification) {
	// Added a key here to track changes to comments
	return h("div.comment", {key: specification}, [
		convertMarkupToHyperScript(specification.text),
		specification.extra ? h("blockquote", {}, convertMarkupToHyperScript(specification.extra)) : [ ]
	])
}

let specificationToViewFunctionMap = {
	"text": viewText,
	"image": viewImage,
	"comment": viewComment
}

function viewSpecification(specification) {
	let viewingFunction = specificationToViewFunctionMap[specification.type]
	return viewingFunction(specification)
}

function viewSpecifiedWidgets() {
	return widgets.map((widget) => {
		return widget.view()
	})
}

function view() {
	return h("div", { id: "hello-demo" },
		specifications ?
			viewSpecifiedWidgets() :
			h("div.loading", { key: "loading" }, "Loading specifications. Please wait...")
	)
}

function loadSpecifications() {
	m.request({url: "specifications.json"}).then(function(data) {
		console.log("Got data", data)
        specifications = data
        widgets = []
		// Add updating functions to specifications
		specifications.forEach(function (specification) {
			widgets.push(new SpecifiedWidget(specification))
		})
	}, function (error) {
		console.log("Something went wrong", error)
	})
}

m.mount(document.body, {view})

loadSpecifications()
