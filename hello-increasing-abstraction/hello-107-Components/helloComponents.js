define(["require", "exports", "../../vendor/maquette/maquette"], function (require, exports, maquette) {
    var h = maquette.h;
    var projector = maquette.createProjector({});
    var Text = (function () {
        function Text(text) {
            this.text = text;
        }
        Text.prototype.renderMaquette = function () {
            return h("div", [this.text]);
        };
        return Text;
    })();
    var Image = (function () {
        function Image(src, alt) {
            this.src = src;
            this.alt = alt;
        }
        Image.prototype.renderMaquette = function () {
            return h("div#image-div", [
                h("img", { "src": this.src, "alt": this.alt })
            ]);
        };
        return Image;
    })();
    var Comment = (function () {
        function Comment(parts) {
            this.parts = parts;
        }
        Comment.prototype.renderMaquette = function () {
            return h("div.comment", this.parts);
        };
        return Comment;
    })();
    var greetingText = new Text("Hello, world!");
    var dojoImage = new Image("../media/sized-dojoToolkitLogo.png", "Dojo Toolkit Logo");
    var comment1 = new Comment([
        h("em", ["vdom"]),
        " via Maquette is a ",
        h("span.special-text", ["plausible"]),
        " move for Dojo2"
    ]);
    var comment2 = new Comment([
        h("em", ["Shuhari"]),
        " (or ",
        h("span.special-text", ["守破離"]),
        " in Japanese) ",
        h("a", { "href": "https://en.wikipedia.org/wiki/Shuhari" }, ["roughly"]),
        " translates to \"first learn, then detach, and finally transcend.\""
    ]);
    var comment3 = new Comment([
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
        ]);
    }
    projector.append(document.body, renderMaquette);
});
