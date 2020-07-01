/* global m */
import "../../vendor/mithril.js"

function view() {
	return {
        "tag": "div",
        "attrs": {
            "id": "hello-demo"
        },
        "children": [
            {
                "tag": "div",
                "attrs": null,
                "text": "Hello, world!"
            },
            {
                "tag": "div",
                "attrs": {
                    "id": "image-div"
                },
                "children": [
                    {
                        "tag": "img",
                        "attrs": {
                            "src": "../media/mithril-logo.svg",
                            "alt": "Mithril Project Logo"
                        },
                        "children": []
                    }
                ]
            },
            {
                "tag": "div",
                "attrs": {
                    "className": "comment"
                },
                "children": [
                    {
                        "tag": "em",
                        "attrs": null,
                        "text": "vdom"
                    },
                    {
                        "tag": "#",
                        "children": " via Mithril is a "
                    },
                    {
                        "tag": "span",
                        "attrs": {
                            "className": "special-text"
                        },
                        "text": "plausible"
                    },
                    {
                        "tag": "#",
                        "children": " move for any project"
                    }
                ]
            },
            {
                "tag": "div",
                "attrs": {
                    "className": "comment"
                },
                "children": [
                    {
                        "tag": "em",
                        "attrs": null,
                        "text": "Shuhari"
                    },
                    {
                        "tag": "#",
                        "children": " (or "
                    },
                    {
                        "tag": "span",
                        "attrs": {
                            "className": "special-text"
                        },
                        "text": "守破離"
                    },
                    {
                        "tag": "#",
                        "children": " in Japanese) "
                    },
                    {
                        "tag": "a",
                        "attrs": {
                            "href": "https://en.wikipedia.org/wiki/Shuhari"
                        },
                        "text": "roughly"
                    },
                    {
                        "tag": "#",
                        "children": " translates to \"first learn, then detach, and finally transcend.\""
                    }
                ]
            },
            {
                "tag": "div",
                "attrs": {
                    "className": "comment"
                },
                "children": [
                    {
                        "tag": "#",
                        "children": "Aikido master Endō Seishirō shihan stated:"
                    },
                    {
                        "tag": "blockquote",
                        "attrs": null,
                        "children": [
                            {
                                "tag": "#",
                                "children": "\"It is known that, when we learn or train in something, we pass through the stages of "
                            },
                            {
                                "tag": "em",
                                "attrs": null,
                                "text": "shu"
                            },
                            {
                                "tag": "#",
                                "children": ", "
                            },
                            {
                                "tag": "em",
                                "attrs": null,
                                "text": "ha"
                            },
                            {
                                "tag": "#",
                                "children": ", and "
                            },
                            {
                                "tag": "em",
                                "attrs": null,
                                "text": "ri"
                            },
                            {
                                "tag": "#",
                                "children": ". These stages are explained as follows. In "
                            },
                            {
                                "tag": "em",
                                "attrs": null,
                                "text": "shu"
                            },
                            {
                                "tag": "#",
                                "children": ", we repeat the forms and discipline ourselves so that our bodies absorb the forms that our forebears created. We remain faithful to these forms with no deviation. Next, in the stage of "
                            },
                            {
                                "tag": "em",
                                "attrs": null,
                                "text": "ha"
                            },
                            {
                                "tag": "#",
                                "children": ", once we have disciplined ourselves to acquire the forms and movements, we make innovations. In this process the forms may be broken and discarded. Finally, in "
                            },
                            {
                                "tag": "em",
                                "attrs": null,
                                "text": "ri"
                            },
                            {
                                "tag": "#",
                                "children": ", we completely depart from the forms, open the door to creative technique, and arrive in a place where we act in accordance with what our heart/mind desires, unhindered while not overstepping laws.\""
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

m.mount(document.body, {view})
