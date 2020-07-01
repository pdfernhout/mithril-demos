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
	constructor (src, alt) {
        this.src = src
        this.alt = alt
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

let greetingText = new Text("Hello, world!")

let dojoImage = new Image("../media/mithril-logo.svg", "Mithril Project Logo")

let comment1 = new Comment("_vdom_ via Mithril is a *plausible* move for any project")

let comment2 = new Comment("_Shuhari_ (or *守破離* in Japanese) roughly|https://en.wikipedia.org/wiki/Shuhari translates to \"first learn, then detach, and finally transcend.\"")

let comment3 = new Comment("Aikido master Endō Seishirō shihan stated:", `"It is known that, when we learn or train in something, we pass through the stages of
_shu_, _ha_, and _ri_. These stages are explained as follows. In
_shu_, we repeat the forms and discipline ourselves so that our bodies absorb the forms that our forebears created. We remain faithful to these forms with no deviation. Next, in the stage of
_ha_, once we have disciplined ourselves to acquire the forms and movements, we make innovations. In this process the forms may be broken and discarded. Finally, in
_ri_, we completely depart from the forms, open the door to creative technique, and arrive in a place where we act in accordance with what our heart/mind desires, unhindered while not overstepping laws."`
)

function view() {
	return h("div", { id: "hello-demo" },
		m(greetingText),
		m(dojoImage),
		m(comment1),
		m(comment2),
		m(comment3)
	)
}

m.mount(document.body, {view})
