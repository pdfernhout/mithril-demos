import maquette = require("../node_modules/maquette/src/maquette");
import dojoString = require("../vendor/dojo-core/string");

let h = maquette.h;
let projector = maquette.createProjector({});

// Brittle function -- just for demonstration
function removeMarkup(text: string) {
	if (text.charAt(0) !== text.charAt(text.length - 1)) {
		return text.substring(1, text.length - 2) + text.charAt(text.length - 1);
	}
	return text.substring(1, text.length - 1);
}

// Inefficient special case function -- just for demonstration
function convertMarkupToHyperScript(text) {
	let parts = text.split(/\s/g);
	console.log("parts", parts);
	let newParts = parts.map((part: string): any => {
		if (dojoString.startsWith(part, "_")) return h("em", {}, removeMarkup(part));
		if (dojoString.startsWith(part, "*")) return h("span.special-text", {}, removeMarkup(part));
		if (part.indexOf('|') !== -1) {
			let sections = part.split('|');
			return h("a", { "href": sections[1] }, [sections[0]])
		}
		return part;
	});
	// TODO: Put in a new final space
	return newParts.map((part) => {
		return [part, " "];	
	});
}

class Text implements maquette.Component {
	constructor (public text: string) { }
	
	renderMaquette() {
		return h("div", [convertMarkupToHyperScript(this.text)]);
	}
}

class Image implements maquette.Component {
	constructor (public src: string, public alt: string) { }
	
	renderMaquette() {
		return h("div#image-div", [
			h("img", { "src": this.src, "alt": convertMarkupToHyperScript(this.alt) } )
		]);
	}
}

class Comment implements maquette.Component {
	constructor (public text: string, public quote?: string) { }
	
	renderMaquette() {
		return h("div.comment", [
			convertMarkupToHyperScript(this.text), 
			this.quote ? h("blockquote", {}, convertMarkupToHyperScript(this.quote)) : [ ]
		]);
	}
}

let greetingText = new Text("Hello, world!");

let dojoImage = new Image("../media/sized-dojoToolkitLogo.png", "Dojo Toolkit Logo");

let comment1 = new Comment("_vdom_ via Maquette is a *plausible* move for Dojo2");

let comment2 = new Comment("_Shuhari_ (or *守破離* in Japanese) roughly|https://en.wikipedia.org/wiki/Shuhari translates to \"first learn, then detach, and finally transcend.\"");

let comment3 = new Comment("Aikido master Endō Seishirō shihan stated:", `"It is known that, when we learn or train in something, we pass through the stages of 
_shu_, _ha_, and _ri_. These stages are explained as follows. In
_shu_, we repeat the forms and discipline ourselves so that our bodies absorb the forms that our forebears created. We remain faithful to these forms with no deviation. Next, in the stage of
_ha_, once we have disciplined ourselves to acquire the forms and movements, we make innovations. In this process the forms may be broken and discarded. Finally, in
_ri_, we completely depart from the forms, open the door to creative technique, and arrive in a place where we act in accordance with what our heart/mind desires, unhindered while not overstepping laws."`
);

// Helper function to support automatically calling renderMaquette function on components -- or calling any functions
function r(...children: Array<any>) {
    return children.map((child) => {
    	if (typeof child === "object" && child.renderMaquette) return child.renderMaquette.bind(child)();
    	if (typeof child === "function") return child();
    	return child;
    });
}

function renderMaquette() {
	return h("div", { id: "hello-demo" }, r(
		greetingText, 
		dojoImage,
		comment1, 
		comment2,
		comment3
	));
}

projector.append(document.body, renderMaquette);