define(["require", "exports", "../../vendor/maquette/maquette", "dojo-core/string"], function (require, exports, maquette, dojoString) {
    "use strict";
    var h = maquette.h;
    var projector = maquette.createProjector({});
    // Convert marked-up words like _this and *that* to HyperScript calls.
    // Convert words with a pipe (|) in them into hyperlinks.
    // For demonstration putposes only -- this is not a robust approach to markup.
    function convertMarkupToHyperScript(text) {
        function removeMarkup(text) {
            if (text.charAt(0) !== text.charAt(text.length - 1)) {
                throw new Error("Unmatched markup for: " + text);
            }
            return text.substring(1, text.length - 1);
        }
        var parts = text.split(/([\s,.;?!])/g);
        var newParts = parts.map(function (part) {
            if (dojoString.startsWith(part, "_"))
                return h("em", {}, removeMarkup(part));
            if (dojoString.startsWith(part, "*"))
                return h("span.special-text", {}, removeMarkup(part));
            if (part.indexOf('|') !== -1) {
                var sections = part.split('|');
                return h("a", { "href": sections[1] }, [sections[0]]);
            }
            return part;
        });
        return newParts;
    }
    var Text = (function () {
        function Text(text) {
            this.text = text;
        }
        Text.prototype.renderMaquette = function () {
            return h("div", [convertMarkupToHyperScript(this.text)]);
        };
        return Text;
    }());
    var Image = (function () {
        function Image(src, alt) {
            this.src = src;
            this.alt = alt;
        }
        Image.prototype.renderMaquette = function () {
            return h("div#image-div", [
                h("img", { "src": this.src, "alt": convertMarkupToHyperScript(this.alt) })
            ]);
        };
        return Image;
    }());
    var Comment = (function () {
        function Comment(text, quote) {
            this.text = text;
            this.quote = quote;
        }
        Comment.prototype.renderMaquette = function () {
            return h("div.comment", [
                convertMarkupToHyperScript(this.text),
                this.quote ? h("blockquote", {}, convertMarkupToHyperScript(this.quote)) : []
            ]);
        };
        return Comment;
    }());
    var greetingText = new Text("Hello, world!");
    var dojoImage = new Image("../media/sized-dojoToolkitLogo.png", "Dojo Toolkit Logo");
    var comment1 = new Comment("_vdom_ via Maquette is a *plausible* move for Dojo2");
    var comment2 = new Comment("_Shuhari_ (or *守破離* in Japanese) roughly|https://en.wikipedia.org/wiki/Shuhari translates to \"first learn, then detach, and finally transcend.\"");
    var comment3 = new Comment("Aikido master Endō Seishirō shihan stated:", "\"It is known that, when we learn or train in something, we pass through the stages of\n_shu_, _ha_, and _ri_. These stages are explained as follows. In\n_shu_, we repeat the forms and discipline ourselves so that our bodies absorb the forms that our forebears created. We remain faithful to these forms with no deviation. Next, in the stage of\n_ha_, once we have disciplined ourselves to acquire the forms and movements, we make innovations. In this process the forms may be broken and discarded. Finally, in\n_ri_, we completely depart from the forms, open the door to creative technique, and arrive in a place where we act in accordance with what our heart/mind desires, unhindered while not overstepping laws.\"");
    // Helper function to support automatically calling renderMaquette function on components -- or calling any functions
    function r() {
        var children = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            children[_i - 0] = arguments[_i];
        }
        return children.map(function (child) {
            if (typeof child === "object" && child.renderMaquette)
                return child.renderMaquette.bind(child)();
            if (typeof child === "function")
                return child();
            return child;
        });
    }
    function renderMaquette() {
        return h("div", { id: "hello-demo" }, r(greetingText, dojoImage, comment1, comment2, comment3));
    }
    projector.append(document.body, renderMaquette);
});
