import maquette = require("../node_modules/maquette/src/maquette");

let h = maquette.h;
let projector = maquette.createProjector({});

class Text implements maquette.Component {
	constructor (public text: string) { }
	
	renderMaquette() {
		return h("div", [this.text]);
	}
}

class Image implements maquette.Component {
	constructor (public src: string, public alt: string) { }
	
	renderMaquette() {
		return h("div#image-div", [
			h("img", { "src": this.src, "alt": this.alt } )
		]);
	}
}

class Comment implements maquette.Component {
	constructor (public parts: Array<maquette.VNodeChild>) { }
	
	renderMaquette() {
		return h("div.comment", this.parts);
	}
}

let greetingText = new Text("Hello, world!");

let dojoImage = new Image("../media/sized-dojoToolkitLogo.png", "Dojo Toolkit Logo");

let comment1 = new Comment([
	h("em", ["vdom"]),
	" via Maquette is a ",
	h("span.special-text", ["strategic"]),
	" move for Dojo2"
]);

let comment2 = new Comment([
	h("em", ["Shuhari"]),
	" (or ",
	h("span.special-text", ["守破離"]),
	" in Japanese) ", 
	h("a", { "href": "https://en.wikipedia.org/wiki/Shuhari" }, ["roughly"]), 
	" translates to \"first learn, then detach, and finally transcend.\""
]);

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
]);

function r(component) {
	return component.renderMaquette();
}

function renderMaquette() {
	return h("div", { id: "hello-demo" }, [
	    // For components, you can call the renderMaquette function yourself
		greetingText.renderMaquette(), 
		dojoImage.renderMaquette(),
		comment1.renderMaquette(), 
		// Or you could use a helper function to call it for you
		r(comment2),
		r(comment3)
		// It feels like perhaps Maquette should change to call any functions passed in to "h" as children 
		// or to call renderMaquette functions of objects passed in (with "this" set to the object)
		// although looking at more cases in the "h" function when looping over children might slightly affect performance...
	]);
}

projector.append(document.body, renderMaquette);