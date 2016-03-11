define(["require", "exports", "../../vendor/maquette/maquette"], function (require, exports, maquette) {
    var h = maquette.h;
    var projector = maquette.createProjector({});
    function textDiv(text) {
        return h("div", [text]);
    }
    function imageDiv(src, alt) {
        return h("div#image-div", [
            h("img", { "src": src, "alt": alt })
        ]);
    }
    function commentDiv(parts) {
        return h("div.comment", parts);
    }
    function renderMaquette() {
        return h("div", { id: "hello-demo" }, [
            textDiv("Hello, world!"),
            imageDiv("../media/sized-dojoToolkitLogo.png", "Dojo Toolkit Logo"),
            commentDiv([
                h("em", ["vdom"]),
                " via Maquette is a ",
                h("span.special-text", ["plausible"]),
                " move for Dojo2"
            ]),
            commentDiv([
                h("em", ["Shuhari"]),
                " (or ",
                h("span.special-text", ["守破離"]),
                " in Japanese) ",
                h("a", { "href": "https://en.wikipedia.org/wiki/Shuhari" }, ["roughly"]),
                " translates to \"first learn, then detach, and finally transcend.\""
            ]),
            commentDiv([
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
        ]);
    }
    projector.append(document.body, renderMaquette);
});
