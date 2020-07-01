/* global m */
import "../../vendor/mithril.js"
const h = m

class Text {
	constructor (text) {
        this.text = text
    }

	view() {
		return h("div", [this.text])
	}
}

class Image {
	constructor (src, alt) {
        this.src = src
        this.alt = alt
    }

	view() {
		return h("div#image-div", [
			h("img", { "src": this.src, "alt": this.alt } )
		])
	}
}

class Comment {
	constructor (parts) {
        this.parts = parts
    }

	view() {
		return h("div.comment", this.parts)
	}
}

let greetingText = new Text("Hello, world!")

let dojoImage = new Image("../media/mithril-logo.svg", "Mithril Project Logo")

let comment1 = new Comment([
	h("em", ["vdom"]),
	" via Mithril is a ",
	h("span.special-text", ["plausible"]),
	" move for any project"
])

let comment2 = new Comment([
	h("em", ["Shuhari"]),
	" (or ",
	h("span.special-text", ["守破離"]),
	" in Japanese) ",
	h("a", { "href": "https://en.wikipedia.org/wiki/Shuhari" }, ["roughly"]),
	" translates to \"first learn, then detach, and finally transcend.\""
])

let comment3 = new Comment([
	"Aikido master Endō Seishirō shihan stated:",
	h("blockquote", [
		"\"It is known that, when we learn or train in something, we pass through the stages of ",
		h("em", ["shu"]), ", ", h("em", ["ha"]), ", and ", h("em", ["ri"]),
		". These stages are explained as follows. In ",
		h("em", ["shu"]), ", we repeat the forms and discipline ourselves so that our bodies absorb the forms that our forebears created. We remain faithful to these forms with no deviation. Next, in the stage of ",
		h("em", ["ha"]), ", once we have disciplined ourselves to acquire the forms and movements, we make innovations. In this process the forms may be broken and discarded. Finally, in ",
		h("em", ["ri"]), ", we completely depart from the forms, open the door to creative technique, and arrive in a place where we act in accordance with what our heart/mind desires, unhindered while not overstepping laws.\""
	])
])

console.log("greetingText.view()", greetingText.view())
console.log("comment3", comment3)

function view() {
	return h("div", { id: "hello-demo" }, [
        // For these components, you can call the view function yourself to produce a vdom structure
        greetingText.view(),
        dojoImage.view(),
        comment1.view(),
        // Or, better yet, let Mithril do it for you! :-)
		m(comment2),
		m(comment3)
	])
}

m.mount(document.body, {view})

// Conversion note: 
// Mithril components are more often configured using attributes e.g. m(MyComponent, {name: "Floyd"})
// instead of using constructors e.g. MyComponent("Floyd").
// Using attributes is better when declaring components within m(...) constructions
// so that the component is not re-created every time that view is called for a redraw.
// See: https://mithril.js.org/components.html#passing-data-to-components
