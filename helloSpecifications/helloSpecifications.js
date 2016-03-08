define(["require", "exports", "../node_modules/maquette/src/maquette", "../vendor/dojo-core/string"], function (require, exports, maquette, dojoString) {
    "use strict";
    var h = maquette.h;
    var projector = maquette.createProjector({});
    // Brittle function -- just for demonstration
    function removeMarkup(text) {
        if (text.charAt(0) !== text.charAt(text.length - 1)) {
            return text.substring(1, text.length - 2) + text.charAt(text.length - 1);
        }
        return text.substring(1, text.length - 1);
    }
    // Inefficient special case function -- just for demonstration
    function convertMarkupToHyperScript(text) {
        var parts = text.split(/\s/g);
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
        // TODO: This puts in a new final space
        return newParts.map(function (part) {
            return [part, " "];
        });
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
    var specifications = [
        {
            type: "text",
            text: "Hello, world!"
        },
        {
            type: "image",
            text: "Dojo Toolkit Logo",
            extra: "../media/sized-dojoToolkitLogo.png"
        },
        {
            type: "comment",
            text: "_vdom_ via Maquette is a *plausible* move for Dojo2"
        },
        {
            type: "comment",
            text: "_Shuhari_ (or *守破離* in Japanese) roughly|https://en.wikipedia.org/wiki/Shuhari translates to \"first learn, then detach, and finally transcend.\""
        },
        {
            type: "comment",
            text: "Aikido master Endō Seishirō shihan stated:",
            extra: "\"It is known that, when we learn or train in something, we pass through the stages of \n_shu_, _ha_, and _ri_. These stages are explained as follows. In\n_shu_, we repeat the forms and discipline ourselves so that our bodies absorb the forms that our forebears created. We remain faithful to these forms with no deviation. Next, in the stage of\n_ha_, once we have disciplined ourselves to acquire the forms and movements, we make innovations. In this process the forms may be broken and discarded. Finally, in\n_ri_, we completely depart from the forms, open the door to creative technique, and arrive in a place where we act in accordance with what our heart/mind desires, unhindered while not overstepping laws.\""
        }
    ];
    // TODO: Should store objects in the array rather than reconvert them every time
    function renderSpecification(specification) {
        if (specification.type === "text")
            return new Text(specification.text).renderMaquette();
        if (specification.type === "image")
            return new Image(specification.extra, specification.text).renderMaquette();
        if (specification.type === "comment")
            return new Comment(specification.text, specification.extra).renderMaquette();
        return "ERROR";
    }
    function renderMaquette() {
        return h("div", { id: "hello-demo" }, specifications.map(function (specification) {
            return renderSpecification(specification);
        }));
    }
    projector.append(document.body, renderMaquette);
});
