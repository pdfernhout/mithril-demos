/* global m */
import "../../vendor/mithril.js"
const h = m

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

class Text {
	constructor (text) {
        this.text = text
    }

	view() {
		return h("div", [convertMarkupToHyperScript(this.text)])
	}
}

class Image {
	constructor (alt, src) {
        this.alt = alt
        this.src = src
    }

	view() {
		return h("div#image-div", [
			h("img", { "src": this.src, "alt": convertMarkupToHyperScript(this.alt) } )
		])
	}
}

class Comment {
	constructor (text, quote) {
        this.text = text
        this.quote = quote
    }

	view() {
		return h("div.comment", [
			convertMarkupToHyperScript(this.text),
			this.quote ? h("blockquote", {}, convertMarkupToHyperScript(this.quote)) : [ ]
		])
	}
}

// interface Specification {
// 	type: string
// 	text: string
// 	extra?: string
// }

let specifications = [
	{
		type: "text",
		text: "Hello, world!"
	},
	{
		type: "image",
		text: "Mithril Project Logo",
		extra: "../media/mithril-logo.svg"
	},
	{
		type: "comment",
		text: "_vdom_ via Mithril is a *plausible* move for any project"
	},
	{
		type: "comment",
		text: "_Shuhari_ (or *守破離* in Japanese) roughly|https://en.wikipedia.org/wiki/Shuhari translates to \"first learn, then detach, and finally transcend.\""
	},
	{
		type: "comment",
		text: "Aikido master Endō Seishirō shihan stated:",
		extra: `"It is known that, when we learn or train in something, we pass through the stages of
_shu_, _ha_, and _ri_. These stages are explained as follows. In
_shu_, we repeat the forms and discipline ourselves so that our bodies absorb the forms that our forebears created. We remain faithful to these forms with no deviation. Next, in the stage of
_ha_, once we have disciplined ourselves to acquire the forms and movements, we make innovations. In this process the forms may be broken and discarded. Finally, in
_ri_, we completely depart from the forms, open the door to creative technique, and arrive in a place where we act in accordance with what our heart/mind desires, unhindered while not overstepping laws."`
	}
]

let specificationToComponentMap = {
	"text": Text,
	"image": Image,
	"comment": Comment
}

function makeComponentForSpecification(specification) {
	let theClass = specificationToComponentMap[specification.type]
	return new theClass(specification.text, specification.extra)
}

var displayItems = []

specifications.forEach((specification) => {
	displayItems.push(makeComponentForSpecification(specification))
})

console.log("displayItems", displayItems)

function view() {
	return h("div", { id: "hello-demo" },
		displayItems.map((displayItem) => {
			return m(displayItem)
		})
	)
}

m.mount(document.body, {view})
