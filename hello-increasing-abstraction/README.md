# hello-increasing-abstraction

This folder consists of 14 examples using [Mithril](https://mithril.js.org/) that all display the same HTML content (about moving from novice to expert) but with increasing levels of abstraction. The point is not to suggest the more abstract approaches are "better" but to say more abstract approaches are possible when needed with a tool like Mithril/HyperScript. 

Related humor: https://danstroot.com/2018/10/03/hammer-factories/  
> "“A hammer?” he asks. “Nobody really buys hammers anymore. They’re kind of old fashioned.” Surprised at this development, I ask him why. ..."

And: https://github.com/EnterpriseQualityCoding/FizzBuzzEnterpriseEdition  
> Enterprise software marks a special high-grade class of software that makes careful use of relevant software architecture design principles to build particularly customizable and extensible solutions to real problems. This project is an example of how the popular FizzBuzz game might be built were it subject to the high quality standards of enterprise software.

And also: https://en.wikipedia.org/wiki/Indirection  
> "All problems in computer science can be solved by another level of indirection ...except for the problem of too many layers of indirection."

And something to ponder (both pros and cons):  
https://en.wikipedia.org/wiki/Rule_of_least_power
> In programming, the rule of least power is a design principle that "suggests choosing the least powerful computer language suitable for a given purpose."

Imagine this series of requests from a customer to a web site developer...

* [hello-101-HTML](hello-101-HTML/helloHTML.html) Your client asks for the simplest possible web page to show some important content.

* [hello-102-InnerHTML](hello-102-InnerHTML/helloInnerHTML.html) Your client asks for the minimal JavaScript program to display the content.

* [hello-103-vdom](hello-103-vdom/helloVdom.html) Your client has heard about this new thing called vdom (virtual dom) that is supposed to be easier to use and asks for the minimal program using it.

* [hello-104-JSX](hello-104-JSX/helloJSX.html) Your client asks for code that looks a lot like HTML and was designed for non-programmers by people who like PHP so in theory their designer who does not know how to program in JavaScript can edit the file for a couple of hours on a year-long project.

* [hello-105-HyperScript](hello-105-HyperScript/helloHyperScript.html) Your client asks for something their software developers could work much more productively with every day of the year than a lowest-common denominator non-standard sort-of-HTML-ish templating language.

* [hello-106-Functions](hello-106-Functions/helloFunctions.html) Your client asks for something a bit more functional. :-)

* [hello-107-Components](hello-107-Components/helloComponents.html) Your client asks for something with more modular reuseable components.

* [hello-108-ComponentsMarkup](hello-108-ComponentsMarkup/helloComponentsMarkup.html) Your client asks for a system that lets their non-programmers write content for the components using a markup language simpler than HTML.

* [hello-109-Specifications](hello-109-Specifications/helloSpecifications.html) Your client asks for a way to configure the components without as much programming using some sort of specification.

* [hello-110-SpecificationsFunctions](hello-110-SpecificationsFunctions/helloSpecificationsFunctions.html) Your client asks for a more functional version of the component code. :-)

* [hello-111-SpecificationsModule](hello-111-SpecificationsModule/helloSpecificationsModule.html) Your client asks for a way to define the specifications in another file so that different people can work on different files at the same time without as many conflicts.

* [hello-112-SpecificationsJSON](hello-112-SpecificationsJSON/helloSpecificationsJSON.html) Your client asks for a way that the specifications for the UI can be loaded over the network.

* [hello-113-SpecificationsEditable](hello-113-SpecificationsEditable/helloSpecificationsEditable.html) Your client asks for a way to edit the specifications while the web page is viewed. 

* [hello-114-SpecifiedWidget](hello-114-SpecifiedWidget/helloSpecifiedWidget.html) Your client asks for a generalized widget system to wrap the specifications.

The examples are variations on displaying this text in different ways:
> "Aikido master Endō Seishirō shihan stated: It is known that, when we learn or train in something, we pass through the stages of shu, ha, and ri. These stages are explained as follows. In shu, we repeat the forms and discipline ourselves so that our bodies absorb the forms that our forebears created. We remain faithful to these forms with no deviation. Next, in the stage of ha, once we have disciplined ourselves to acquire the forms and movements, we make innovations. In this process the forms may be broken and discarded. Finally, in ri, we completely depart from the forms, open the door to creative technique, and arrive in a place where we act in accordance with what our heart/mind desires, unhindered while not overstepping laws." 

Mithril makes it easier to go through that progression from novice to transcendent expert because Mithril enforces no opinion about certain key design choices -- whereas some recently popularized UI systems like React from Facebook and Angular by Google make that journey harder and/or longer. 

The concerns of a company with thousands of developers building essentially one huge website with billions of users maintained for years are not necessarily the concerns many other people have in different contexts. There is a lot of cost to excessive complexity. And that even assumes they got it right in the first place for huge websites (which perhaps they did not). 

Angular and React also have an excessive cognitive overload compared to Mithril while delivering less flexibility. That is because they develop adhoc approaches to making UIs which fail to leverage JavaScript. And JavaScript is the one thing almost every web developer eventually will learn for one project or another, so why not make the most of it?

Focusing on the right level of simplification appropriate to making Single Page Apps for the Web was part of Leo Horie's brilliance in the original Mithril design after his work with AngularJS (and since improved by others -- my thanks everyone who helped). It takes a lot of insight to make things simpler. Rich Hickey is another person who deeply gets the power of simplicity (at the language level in his case with Clojure):  
https://www.infoq.com/presentations/Simple-Made-Easy/

For React, part of that excess complexity in using it is due to its premature optimization of requiring setState(...) to keep local state stored in every component -- leading to bloated craziness like Redux and even Redux-Saga which is basically a workaround to support global state like Mithril supports out of the box with no special tooling. The examples here would be more cumbersome to write in React -- not impossible, but just more awkward. And React also encourages using the non-standard JSX templating approach (kinda like HTML -- but not really) to define vdoms instead of using just plain JavaScript with HyperScript like Mithril uses. 

Part of this also comes down to maybe a larger design issue of the difference between "patterns" and "libraries". Mithril essentially makes it easy to use any pattern you want as demonstrated by the above examples -- although sometimes at a cost of seeing and understanding the pattern (as opposed to learning a standard library which encapsulates a specific pattern in a specific way). React and Angular when used the way the designers intend and advocate for are much more limiting while also having steeper initial learning curves and more complex developer tooling needs.

Here is a document I put together with more details on why I prefer Mithril over React and Angular (having used all three for production code):  
https://github.com/pdfernhout/choose-mithril

I originally wrote these examples for Maquette (another vdom library). Because Maquette and Mithril both emphasize using HyperScript, the examples were relatively easy to convert from one system to the other in a few hours (much of which time was from tossing out TypeScript and changing some coding conventions).