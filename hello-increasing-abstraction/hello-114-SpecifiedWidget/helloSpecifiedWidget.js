define(["require", "exports", "../../vendor/maquette/maquette", "dojo-core/string", "dojo-core/request"], function (require, exports, maquette, dojoString, request_1) {
    var h = maquette.h;
    var projector = maquette.createProjector({});
    var Specification = (function () {
        function Specification() {
        }
        return Specification;
    })();
    var specifications = null;
    var widgets = null;
    // Maquette requires always setting callbacks to the same function
    // Use a SpecifiedWidget class that supports this to better document intent
    var SpecifiedWidget = (function () {
        function SpecifiedWidget(specification) {
            this.specification = specification;
            this.isEditing = false;
        }
        ;
        SpecifiedWidget.prototype.setType = function (event) {
            console.log("setType", event);
            this.specification.type = event.target.value;
        };
        SpecifiedWidget.prototype.setText = function (event) {
            console.log("setText", event);
            this.specification.text = event.target.value;
        };
        SpecifiedWidget.prototype.setExtra = function (event) {
            console.log("setExtra", event);
            this.specification.extra = event.target.value;
        };
        SpecifiedWidget.prototype.editClicked = function () {
            console.log("editClicked", this);
            this.isEditing = true;
        };
        SpecifiedWidget.prototype.acceptChangesClicked = function () {
            console.log("acceptChangesClicked", this);
            this.isEditing = false;
        };
        SpecifiedWidget.prototype.renderEditor = function () {
            return h("div.editor", { key: this }, [
                "Type: ", h("input", { value: this.specification.type, onchange: this.setType, bind: this }), h("br"),
                "Text: ", h("input", { value: this.specification.text, onchange: this.setText, bind: this }), h("br"),
                "Extra: ", h("textarea", { value: this.specification.extra || "", onchange: this.setExtra, bind: this }), h("br"),
                h("button", { onclick: this.acceptChangesClicked, bind: this }, "Done")
            ]);
        };
        SpecifiedWidget.prototype.renderMaquette = function () {
            return h("div.edit", { key: this }, [
                this.isEditing ?
                    this.renderEditor() : [
                    h("button", { onclick: this.editClicked, bind: this, style: "float: right;" }, "Edit"),
                    renderSpecification(this.specification)
                ]
            ]);
        };
        return SpecifiedWidget;
    })();
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
    function renderSpecifiedWidgets() {
        return widgets.map(function (widget) {
            return widget.renderMaquette();
        });
    }
    function renderMaquette() {
        return h("div", { id: "hello-demo" }, specifications ?
            renderSpecifiedWidgets() :
            h("div.loading", { key: "loading" }, "Loading specifications. Please wait..."));
    }
    function loadSpecifications() {
        request_1.default("specifications.json", { handleAs: 'json' }).then(function (response) {
            console.log("Got response", response);
            specifications = response.data;
            widgets = [];
            // Add updatign functions to specifications
            specifications.forEach(function (specification) {
                widgets.push(new SpecifiedWidget(specification));
            });
            // Try commenting out the next line to see what happens (or doesn't happen)
            projector.scheduleRender();
        }, function (error) {
            console.log("Something went wrong", error);
        });
    }
    projector.append(document.body, renderMaquette);
    loadSpecifications();
});
