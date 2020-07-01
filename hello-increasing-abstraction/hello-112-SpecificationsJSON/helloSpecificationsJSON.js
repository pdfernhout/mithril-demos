/* global m */
import "../../vendor/mithril.js"
const h = m

var specifications = null

// interface Specification {
// 	type: string
// 	text: string
// 	extra?: string
// }

// Convert marked-up words like _this_ and *that* to HyperScript calls.
// Convert words with a pipe (|) in them into hyperlinks.
// For demonstration purposes only -- this is not a robust approach to markup.
function convertMarkupToHyperScript(text) {
	let parts = text.split(/(\s+|[,.;?!](?=\s))/g)

	let newParts = parts.map((part) => {
		if (part.startsWith("_")) return h("em", {}, removeMarkup(part))
		if (part.startsWith("*")) return h("span.special-text", {}, removeMarkup(part))
		if (part.indexOf("|") !== -1) {
			let sections = part.split("|")
			return h("a", { "href": sections[1] }, [sections[0]])
		}
		return part
	})
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
	let viewFunction = specificationToViewFunctionMap[specification.type]
	return viewFunction(specification)
}

function viewSpecifications() {
	return specifications.map((specification) => {
		return viewSpecification(specification)
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
	}, function (error) {
		console.log("Something went wrong", error)
	})
}

loadSpecifications()

m.mount(document.body, {view})
