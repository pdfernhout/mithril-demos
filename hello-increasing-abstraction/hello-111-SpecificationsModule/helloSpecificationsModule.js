define(["require", "exports", "../../vendor/maquette/maquette", "dojo-core/string", "./specifications"], function (require, exports, maquette, dojoString, specifications) {
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
        var parts = text.split(/(\s+|[,.;?!](?=\s))/g);
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
    function renderText(text, extra) {
        return h("div", [convertMarkupToHyperScript(text)]);
    }
    function renderImage(alt, src) {
        return h("div#image-div", [
            h("img", { "src": src, "alt": convertMarkupToHyperScript(alt) })
        ]);
    }
    function renderComment(text, quote) {
        return h("div.comment", [
            convertMarkupToHyperScript(text),
            quote ? h("blockquote", {}, convertMarkupToHyperScript(quote)) : []
        ]);
    }
    var specificationToRenderingFunctionMap = {
        "text": renderText,
        "image": renderImage,
        "comment": renderComment
    };
    function renderSpecification(specification) {
        var renderingFunction = specificationToRenderingFunctionMap[specification.type];
        return renderingFunction(specification.text, specification.extra);
    }
    function renderMaquette() {
        return h("div", { id: "hello-demo" }, specifications.map(function (specification) {
            return renderSpecification(specification);
        }));
    }
    projector.append(document.body, renderMaquette);
});
