var h = maquette.h;
var projector = maquette.createProjector({});
function renderMaquette() {
	return h(
		"div",
		{ id: "hello-demo" },
		h(
			"div",
			null,
			"Hello, world!"
		),
		h(
			"div",
			{ id: "image-div" },
			h("img", { src: "../media/sized-dojoToolkitLogo.png", alt: "Dojo Toolkit Logo" })
		),
		h(
			"div",
			{ "class": "comment" },
			h(
				"em",
				null,
				"vdom"
			),
			" via Maquette is a ",
			h(
				"span",
				{ "class": "special-text" },
				"strategic"
			),
			" move for Dojo2"
		),
		h(
			"div",
			{ "class": "comment" },
			h(
				"em",
				null,
				"Shuhari"
			),
			" (or ",
			h(
				"span",
				{ "class": "special-text" },
				"守破離"
			),
			" in Japanese) ",
			h(
				"a",
				{ href: "https://en.wikipedia.org/wiki/Shuhari" },
				"roughly"
			),
			" translates to \"first learn, then detach, and finally transcend.\""
		),
		h(
			"div",
			{ "class": "comment" },
			"Aikido master Endō Seishirō shihan stated:",
			h(
				"blockquote",
				null,
				"\"It is known that, when we learn or train in something, we pass through the stages of ",
				h(
					"em",
					null,
					"shu"
				),
				", ",
				h(
					"em",
					null,
					"ha"
				),
				", and ",
				h(
					"em",
					null,
					"ri"
				),
				". These stages are explained as follows. In ",
				h(
					"em",
					null,
					"shu"
				),
				", we repeat the forms and discipline ourselves so that our bodies absorb the forms that our forebears created. We remain faithful to these forms with no deviation. Next, in the stage of ",
				h(
					"em",
					null,
					"ha"
				),
				", once we have disciplined ourselves to acquire the forms and movements, we make innovations. In this process the forms may be broken and discarded. Finally, in ",
				h(
					"em",
					null,
					"ri"
				),
				", we completely depart from the forms, open the door to creative technique, and arrive in a place where we act in accordance with what our heart/mind desires, unhindered while not overstepping laws.\""
			)
		)
	);
}
document.addEventListener('DOMContentLoaded', function () {
	projector.append(document.body, renderMaquette);
});
