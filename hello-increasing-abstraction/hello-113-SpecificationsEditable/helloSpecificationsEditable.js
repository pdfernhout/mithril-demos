/* global m */
import "../../vendor/mithril.js"
const h = m

var specifications = null

// interface Specification {
// 	type: string
// 	text: string
// 	extra?: string
// 	isEditing?: boolean
// 	// TODO: Better typing for functions
// 	setType: any
// 	setText: any
// 	setExtra: any
// 	toggleEditor: any
// 	acceptChanges: any
// }

function setType(specification, event) {
	console.log("setType", event)
	specification.type = event.target.value
}

function setText(specification, event) {
	console.log("setText", event)
	specification.text = event.target.value
}

function setExtra(specification, event) {
	console.log("setExtra", event)
	specification.extra = event.target.value
}

// TODO: Convert specifications to SpecifiedWidgets
// class SpecifiedWidget {
//	constructor(public type: string, public text: string, public extra?: string) {}
// }

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

function viewEditor(specification) {
	return h("div.editor", { key: specification }, [
		"Type: ", h("input", { value: specification.type, onchange: specification.setType }), h("br"),
		"Text: ", h("input", { value: specification.text, onchange: specification.setText }), h("br"),
		"Extra: ", h("textarea", { value: specification.extra || "", onchange: specification.setExtra }), h("br"),
		h("button", { onclick: specification.acceptChanges }, "Done")
	])
}

function editClicked(specification) {
	console.log("editClicked")
	specification.isEditing = !specification.isEditing
}

function acceptChangesClicked(specification) {
	console.log("acceptChangesClicked")
	specification.isEditing = !specification.isEditing
}

function viewSpecifications() {
	return specifications.map((specification) => {
		return h("div.edit", { key: specification }, [
			specification.isEditing ?
				viewEditor(specification) :
				[
					h("button", { key: "edit-button", onclick: specification.toggleEditor, style: "float: right;" }, "Edit"),
					viewSpecification(specification)
				]
		])
	})
}

function view() {
	return h("div", { id: "hello-demo" },
		specifications ?
			viewSpecifications() :
			h("div.loading", { key: "loading" }, "Loading specifications. Please wait...")
	)
}

function loadSpecifications() {
	m.request({url: "specifications.json"}).then(function(data) {
		console.log("Got data", data)
        specifications = data
        // Add updating functions to specifications
		specifications.forEach(function (specification) {
			// TODO: Use a SpecifiedWidget class that supports this to better document intent
			specification.toggleEditor = () => editClicked(specification)
			specification.acceptChanges = () => acceptChangesClicked(specification)
			specification.setType = (event) => setType(specification, event)
			specification.setText = (event) => setText(specification, event)
			specification.setExtra = (event) => setExtra(specification, event)
		})
	}, function (error) {
		console.log("Something went wrong", error)
	})
}

loadSpecifications()

m.mount(document.body, {view})
