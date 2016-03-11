import maquette = require("../../vendor/maquette/maquette");

var h = maquette.h;
var projector = maquette.createProjector({});

function renderMaquette(): any {
	return {
	    "vnodeSelector": "div",
	    "properties": {
	    	id: "hello-demo"
	    },
	    "children": [
	        {
	            "vnodeSelector": "div",
	            "text": "Hello, world!",
	            "domNode": null
	        },
	        {
	            "vnodeSelector": "div#image-div",
	            "children": [
	                {
	                    "vnodeSelector": "img",
	                    "properties": {
	                        "src": "../media/sized-dojoToolkitLogo.png",
	                        "alt": "Dojo Toolkit Logo"
	                    },
	                    "children": [],
	                    "domNode": null
	                }
	            ],
	            "domNode": null
	        },
	        {
	            "vnodeSelector": "div.comment",
	            "children": [
	                {
	                    "vnodeSelector": "em",
	                    "text": "vdom",
	                    "domNode": null
	                },
	                {
	                    "vnodeSelector": "",
	                    "text": " via Maquette is a ",
	                    "domNode": null
	                },
	                {
	                    "vnodeSelector": "span.special-text",
	                    "text": "plausible",
	                    "domNode": null
	                },
	                {
	                    "vnodeSelector": "",
	                    "text": " move for Dojo2",
	                    "domNode": null
	                }
	            ],
	            "domNode": null
	        },
	        {
	            "vnodeSelector": "div.comment",
	            "children": [
	                {
	                    "vnodeSelector": "em",
	                    "text": "Shuhari",
	                    "domNode": null
	                },
	                {
	                    "vnodeSelector": "",
	                    "text": " (or ",
	                    "domNode": null
	                },
	                {
	                    "vnodeSelector": "span.special-text",
	                    "text": "守破離",
	                    "domNode": null
	                },
	                {
	                    "vnodeSelector": "",
	                    "text": " in Japanese) ",
	                    "domNode": null
	                },
	                {
	                    "vnodeSelector": "a",
	                    "properties": {
	                        "href": "https://en.wikipedia.org/wiki/Shuhari"
	                    },
	                    "text": "roughly",
	                    "domNode": null
	                },
	                {
	                    "vnodeSelector": "",
	                    "text": " translates to \"first learn, then detach, and finally transcend.\"",
	                    "domNode": null
	                }
	            ],
	            "domNode": null
	        },
	        {
	            "vnodeSelector": "div.comment",
	            "children": [
	                {
	                    "vnodeSelector": "",
	                    "text": "Aikido master Endō Seishirō shihan stated:",
	                    "domNode": null
	                },
	                {
	                    "vnodeSelector": "blockquote",
	                    "children": [
	                        {
	                            "vnodeSelector": "",
	                            "text": "\"It is known that, when we learn or train in something, we pass through the stages of ",
	                            "domNode": null
	                        },
	                        {
	                            "vnodeSelector": "em",
	                            "text": "shu",
	                            "domNode": null
	                        },
	                        {
	                            "vnodeSelector": "",
	                            "text": ", ",
	                            "domNode": null
	                        },
	                        {
	                            "vnodeSelector": "em",
	                            "text": "ha",
	                            "domNode": null
	                        },
	                        {
	                            "vnodeSelector": "",
	                            "text": ", and ",
	                            "domNode": null
	                        },
	                        {
	                            "vnodeSelector": "em",
	                            "text": "ri",
	                            "domNode": null
	                        },
	                        {
	                            "vnodeSelector": "",
	                            "text": ". These stages are explained as follows. In ",
	                            "domNode": null
	                        },
	                        {
	                            "vnodeSelector": "em",
	                            "text": "shu",
	                            "domNode": null
	                        },
	                        {
	                            "vnodeSelector": "",
	                            "text": ", we repeat the forms and discipline ourselves so that our bodies absorb the forms that our forebears created. We remain faithful to these forms with no deviation. Next, in the stage of ",
	                            "domNode": null
	                        },
	                        {
	                            "vnodeSelector": "em",
	                            "text": "ha",
	                            "domNode": null
	                        },
	                        {
	                            "vnodeSelector": "",
	                            "text": ", once we have disciplined ourselves to acquire the forms and movements, we make innovations. In this process the forms may be broken and discarded. Finally, in ",
	                            "domNode": null
	                        },
	                        {
	                            "vnodeSelector": "em",
	                            "text": "ri",
	                            "domNode": null
	                        },
	                        {
	                            "vnodeSelector": "",
	                            "text": ", we completely depart from the forms, open the door to creative technique, and arrive in a place where we act in accordance with what our heart/mind desires, unhindered while not overstepping laws.\"",
	                            "domNode": null
	                        }
	                    ],
	                    "domNode": null
	                }
	            ],
	            "domNode": null
	        }
	    ],
	    "domNode": null
	}
}

projector.append(document.body, renderMaquette);
