# mithril-demos
Demos using [Mithril](https://mithril.js.org/) in ES6 JavaScript

* [currency-converter](./currency-converter) is a couple of simple demos of interactive forms in Mithril
* [hello-increasing-abstraction](./hello-increasing-abstraction) is a series of fourteen examples demonstrating moving from displaying plain HTML for content towards finally using specification-driven components for editing content initially requested over the network
* [three-cube](./three-cube) demonstrates the integration of three.js with Mithril

License: MIT

Vendor (third-party):

* Mithril (MIT license) used in all demos
* three.js (MIT license) used in three-cube

These examples were originally written for Maquette vdom and then converted over to Mithril.

### Mithril examples of entire applications

Here are some FOSS projects I (pdfernhout) have worked on in Mithril which provide examples of entire Mithril applications you can learn from:
* StoryHarp Interactive Fiction Authoring System: https://github.com/pdfernhout/storyharp-js
* NarraFirma for story collection and analysis: https://github.com/pdfernhout/narrafirma
* Twirlip7 Programmable Notebook with examples: https://github.com/pdfernhout/Twirlip7/tree/master/src/ui/examples
* Twirlip15 Filer and Idea Organizer: https://github.com/pdfernhout/Twirlip15

There are lots of ways to write Mithril JavaScript applications depending on your abilities, needs, and circumstances. So, these can just provide ideas to help get you started. You may end up using a different approach. StoryHarp is a port of a desktop Delphi application ot Mithril with mulit-level undo, but that may be overkill for most simple web apps. NarraFirma uses a perhaps overly-abstract specification approach to defined the UI which was first implemented under Dojo when I was uncertain if I would want to stick with that framework and I later converted that code to use the specifications to create Mithril widgets instead (like the 14th example in increasing abstraction); I would write that application more directly in Mithril now without the specifications. The Twirlip7 programmable notebook offers a place on the web to write essentially small applets of Mithril, but in practice VSCode or such might be a better experience for sizeable apps. The Twirlip15 application is intended for just running Mithril locally on your own developer machine to support developing small information organizer and transformation tools in Mithril for day-to-day professional needs. Each context and set of priorities drove the development process in different directions -- and there may well have been other paths each could have taken even given the same apparent constraints.

### Mithril examples and applications by others

Collections of examples of Mithril in action can be found at these links:
* https://mithril.js.org/examples.html
* https://github.com/MithrilJS/mithril.js/wiki/Example-Applications
* https://mithril-examples.firebaseapp.com/
* https://github.com/orbitbot/awesome-mithril
* https://github.com/MithrilJS/mithril.js/wiki/Who-Uses-Mithril
