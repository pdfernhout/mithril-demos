define(["require", "exports", "../../vendor/maquette/maquette", "dojo-core/string", "dojo-core/request"], function (require, exports, maquette, dojoString, request_1) {
    "use strict";
    var h = maquette.h;
    var projector = maquette.createProjector({});
    var specifications = null;
    function setType(specification, event) {
        console.log("setType", event);
        specification.type = event.target.value;
    }
    function setText(specification, event) {
        console.log("setText", event);
        specification.text = event.target.value;
    }
    function setExtra(specification, event) {
        console.log("setExtra", event);
        specification.extra = event.target.value;
    }
    // TODO: Convert specifications to SpecifiedWidgets
    // class SpecifiedWidget {
    //	constructor(public type: string, public text: string, public extra?: string) {}
    // }
    // Convert marked-up words like _this_ and *that* to HyperScript calls.
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
    function renderText(specification) {
        return h("div", { key: specification }, [convertMarkupToHyperScript(specification.text)]);
    }
    function renderImage(specification) {
        return h("div#image-div", { key: specification }, [
            h("img", { "src": specification.extra, "alt": convertMarkupToHyperScript(specification.text) })
        ]);
    }
    function renderComment(specification) {
        // Added a key here so Maquette can track changes to comments
        return h("div.comment", { key: specification }, [
            convertMarkupToHyperScript(specification.text),
            specification.extra ? h("blockquote", {}, convertMarkupToHyperScript(specification.extra)) : []
        ]);
    }
    var specificationToRenderingFunctionMap = {
        "text": renderText,
        "image": renderImage,
        "comment": renderComment
    };
    function renderSpecification(specification) {
        var renderingFunction = specificationToRenderingFunctionMap[specification.type];
        return renderingFunction(specification);
    }
    function renderEditor(specification) {
        return h("div.editor", { key: specification }, [
            "Type: ", h("input", { value: specification.type, onchange: specification.setType }), h("br"),
            "Text: ", h("input", { value: specification.text, onchange: specification.setText }), h("br"),
            "Extra: ", h("textarea", { value: specification.extra || "", onchange: specification.setExtra }), h("br"),
            h("button", { onclick: specification.acceptChanges }, "Done")
        ]);
    }
    function editClicked(specification) {
        console.log("editClicked");
        specification.isEditing = !specification.isEditing;
    }
    function acceptChangesClicked(specification) {
        console.log("acceptChangesClicked");
        specification.isEditing = !specification.isEditing;
    }
    function renderSpecifications() {
        return specifications.map(function (specification) {
            return h("div.edit", { key: specification }, [
                specification.isEditing ?
                    renderEditor(specification) :
                    [
                        h("button", { onclick: specification.toggleEditor, style: "float: right;" }, "Edit"),
                        renderSpecification(specification)
                    ]
            ]);
        });
    }
    function renderMaquette() {
        return h("div", { id: "hello-demo" }, specifications ?
            renderSpecifications() :
            h("div.loading", { key: "loading" }, "Loading specifications. Please wait..."));
    }
    function loadSpecifications() {
        request_1.default("specifications.json", { handleAs: 'json' }).then(function (response) {
            console.log("Got response", response);
            specifications = response.data;
            // Add updatign functions to specifications
            specifications.forEach(function (specification) {
                // Maquette requires always setting callbacks to the same function
                // TODO: Use a SpecifiedWidget class that supports this to better document intent
                specification.toggleEditor = editClicked.bind(null, specification);
                specification.acceptChanges = acceptChangesClicked.bind(null, specification);
                specification.setType = setType.bind(null, specification);
                specification.setText = setText.bind(null, specification);
                specification.setExtra = setExtra.bind(null, specification);
            });
            // Try commenting out the next line to see what happens (or doesn't happen)
            projector.scheduleRender();
        }, function (error) {
            console.log("Something went wrong", error);
        });
    }
    loadSpecifications();
    projector.append(document.body, renderMaquette);
});
