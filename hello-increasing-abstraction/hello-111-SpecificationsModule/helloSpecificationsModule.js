/* global m */
import "../../vendor/mithril.js"
const h = m

// interface Specification {
// 	type: string
// 	text: string
// 	extra?: string
// }

import { specifications } from "./specifications.js"

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

function viewText(text) {
	return h("div", [convertMarkupToHyperScript(text)])
}

function viewImage(alt, src) {
	return h("div#image-div", [
		h("img", { "src": src, "alt": convertMarkupToHyperScript(alt) } )
	])
}

function viewComment(text, quote) {
	return h("div.comment", [
		convertMarkupToHyperScript(text),
		quote ? h("blockquote", {}, convertMarkupToHyperScript(quote)) : [ ]
	])
}

let specificationToViewFunctionMap = {
	"text": viewText,
	"image": viewImage,
	"comment": viewComment
}

function viewSpecification(specification) {
	let viewFunction = specificationToViewFunctionMap[specification.type]
	return viewFunction(specification.text, specification.extra)
}

function view() {
	return h("div", { id: "hello-demo" },
		specifications.map((specification) => {
			return viewSpecification(specification)
		})
	)
}

m.mount(document.body, {view})
