# hello-increasing-abstraction

This folder consists of 14 examples using [Mithril](https://mithril.js.org/) that all display the same HTML content (about moving from novice to expert) but with increasing levels of abstraction. The point is not to suggest the more abstract approaches are "better" but to say more abstract approaches are feasible when needed with a tool like Mithril/HyperScript. To see these demos in action you will need to run them under a web server of some sort -- perhaps even [Twirlip15](https://github.com/pdfernhout/Twirlip15)?

Imagine this series of requests from a customer to a web site developer...

* [hello-101-HTML](hello-101-HTML/helloHTML.html) Your client asks for the simplest possible web page to show some important content.

* [hello-102-InnerHTML](hello-102-InnerHTML/helloInnerHTML.html) Your client asks for the minimal JavaScript program to display the content.

* [hello-103-vdom](hello-103-vdom/helloVdom.html) Your client has heard about this new thing called vdom (virtual dom) that is supposed to be easier to use and asks for the minimal computationally-efficient program using it.

* [hello-104-JSX](hello-104-JSX/helloJSX.html) Your client asks for code that looks a lot like HTML and was designed for non-programmers by people who like PHP and `<div>...</div>` constructs. This way, in theory, their designer who does not know how to program in JavaScript can feel comfortable editing a program file for a couple of hours on a year-long project worked on mainly by other people.

* [hello-105-HyperScript](hello-105-HyperScript/helloHyperScript.html) It turns out the designer just wanted to edit CSS stylesheets anyway (not JavaScript code), so your client asks for something their software developers could work with much more productively every day of the year. Ideally it should be something better than the lowest-common denominator non-standard sort-of-HTML-ish templating language in the previous example -- where JSX slows development down by requiring mentally jumping back and forth several times in a few lines between different language contexts (HTML and JavaScript) to get anything done. The answer you find is to use the HyperScript API -- which is just a function call in JavaScript like `h("div", ...)`.

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

### Humor about abstraction and complexity

Related cautionary humor on excessive abstraction: https://danstroot.com/2018/10/03/hammer-factories/  
> "“A hammer?” he asks. “Nobody really buys hammers anymore. They’re kind of old fashioned.” Surprised at this development, I ask him why. ..."

And: https://github.com/EnterpriseQualityCoding/FizzBuzzEnterpriseEdition  
> Enterprise software marks a special high-grade class of software that makes careful use of relevant software architecture design principles to build particularly customizable and extensible solutions to real problems. This project is an example of how the popular FizzBuzz game might be built were it subject to the high quality standards of enterprise software.

And also: https://en.wikipedia.org/wiki/Indirection  
> "All problems in computer science can be solved by another level of indirection ...except for the problem of too many layers of indirection."

And something to ponder (both pros and cons):  
https://en.wikipedia.org/wiki/Rule_of_least_power
> In programming, the rule of least power is a design principle that "suggests choosing the least powerful computer language suitable for a given purpose."

### A programming profession about managing complexity

The concerns of a company with thousands of developers building essentially one huge website with billions of users maintained for years (as in Facebook/React and Google/Angular) are not necessarily the concerns many other people have in different contexts. And that even assumes they got it right in the first place for huge websites -- which perhaps they did not. 

There is a lot of cost to excessive complexity and abstraction -- even as some complexity and abstraction is often needed to address challenges expediently. Knowing the right time to use a given level of complexity and abstraction to address some important challenge given various constraints is something a good software developer gets better at as they learn their craft over a lifetime. 

And part of that craft also involves understanding the often non-obvious constraints on constraints themselves -- or in other words, appreciating potential flexibility of some constraints. That discovery of flexibility given actual priorities is often done by asking questions -- or sometimes also done by just staring out the window and thinking and imagining "what if". 

And even then, an expert can still get things wrong like by making a human mistake from limited concentration amidst multiple demands or from limited knowledge amidst pervasive uncertainty.

No one person always gets it right. Ultimately, a diversity of opinions well-articulated and discussed tends to lead to better outcomes. Ideally such discussion is done in an ego-less way like through [Dialogue Mapping](http://cognexus.org/id41.htm) of questions, ideas, and their pros and cons as with the simple-but-powerful IBIS methodology. And experts might get bored doing some repetitive but needed tasks that novices might enjoy (see also ["Flow"](https://en.wikipedia.org/wiki/Flow_(psychology))). That is part of why teams of people with mixed levels of abilities and various perspectives can be worthwhile. Ideally we use tools and processes that support that spectrum of abilities and perspectives.

### Where Angular and React go wrong compared to Mithril

Angular and React have an excessive cognitive overload compared to Mithril while delivering less flexibility. Part of that is because they encourage making UIs through ad-hoc templating systems like React's JSX or Angular's equivalent which fail to leverage JavaScript. JavaScript is the one thing almost every web developer eventually will learn for one project or another -- so why not make the most of it? 

The argument for such tools like Angular over Mithril beyond their popularity stemming from beign pushed by huge companies is related (though not identical) to the argument for using Visual Basic over, say, Lisp or now JavaScript. If programmers can't easily do anything complicated, then they are less likely to create a mess. That's certainly true, and as Brian Kernighan said: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it." It takes a lot of discipline and experience to use only "the good parts" of JavaScript or other systems -- just like it requires craft skill to build a big barn out of only wood that won't collapse. Still, in the end I'd suggest React and Angular don't really deliver on the promise of being more maintainable than alternatives -- because it is also easy to make messes in both of those (Angular especially with RxJS, and React especially with Redux).

Focusing on the right level of simplification appropriate to making Single Page Apps for the Web was part of Leo Horie's brilliance in the original Mithril design after his work with AngularJS. That design was since refined by others -- and my thanks go to everyone who helped make it simpler and better, especially Isiah Meadows. It takes a lot of insight to make things simpler (and to keep them that way). As in: "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away. (Antoine de Saint-Exupery)"

One of Leo's key insights (similar to in Elm) was that implementations and APIs can be simpler if you just assume the UI is "dirty" and needs to be re-rendered in its entirety after every user interaction you listen for (like a button press) or after any network request. That decision makes it much easier to reason about the behavior of UIs compared to dependency management (like typical in Java or Smalltalk UIs or previous JavaScript UI libraries like Dojo/Dijit). While there are some times when that approach needs to be optimized (like when listening on mouse movements or scrolling large grids) it is the better choice to say the special cases should be optimized instead of saying every case needs optimization (as in contrast with React). And assuming everything might be dirty after a UI interaction is a better choice overall for modern hardware than creating invasive software complexity in hopes (mostly unrealized) of more efficient "dirty checking" like with Angular. Unlike Elm though, Leo worked within the existing language of JavaScript (which has pros and cons vs. a strongly-typed new language like Elm). Rich Hickey is another person who deeply gets the power of simplicity (especially in his case at the language level with Clojure), as in his great talk ["Simple Made Easy"](https://www.infoq.com/presentations/Simple-Made-Easy/).

For React, part of that excess complexity in using it is due to its [premature optimization](http://wiki.c2.com/?PrematureOptimization) of requiring setState(...) to keep local state stored in every component. That design choice was so that React can then optimally update only specific vdom subtrees when a component changes state. While well-intended perhaps, that unfortunate design choice by React to emphasize setState(...) with localized state held in components eventually leads to bloated craziness like Redux and even Redux-Saga which is basically a workaround to support global shared state -- something Mithril supports out of the box with no special tooling. In general, what React celebrates as its key design choice of emphasizing keeping all state in components is essentially a variant of something Leo Horie (Mithil's original author) calls ["fat controllers"](http://lhorie.github.io/mithril-blog/common-mistakes.html) as something to be careful about using as a design pattern. Ironically, that limiting pre-mature optimization ignored that any vdom system like Mithril or React optimizes actual changes to the DOM regardless of behind-the-scenes vdom changes, and so there is limited need for optimizing vdom updates in most cases.

The examples here would be more cumbersome to write in React -- not impossible, but just more awkward. It took years for React to finally add functional components to make some tasks done here easier -- something Mithril had out of the box from the beginning by being class-agnostic and functionally-supportive. And Mithril does that without all the special ceremony with "hooks" and "effects" you need to learn to use React functional components. And React also encourages using the non-standard JSX templating approach (kinda like HTML -- but not really) to define vdoms instead of using just plain JavaScript with HyperScript like Mithril uses. So React introduces unneeded clutter in its own codebase and then in your codebase -- just because the original authors probably had trouble letting go of bad experience carried over from excessive PHP-use. Of course since so many people use React there are some nice components written in it -- components which you can always wrap in Mithril if you want to use them.

Part of this disagreement with current mainstream fads like Angular and React also comes down to a larger design issue of the difference between "patterns" and "libraries". Mithril essentially makes it easy to use any pattern you want as demonstrated by the above examples. Although sometimes that comes at a cost of having to see and understand the pattern. This is as opposed to learning a single large library which encapsulates a specific pattern in a specific way and encourages everything to be done in that one way. Often with such a library, anything else is really difficult. It may be difficult either technically because you still need to satisfy the library's artificial constraints (see Fred Brooks' [No Silver Bullet](https://en.wikipedia.org/wiki/No_Silver_Bullet) point on distinguishing between "accidental complexity and essential complexity"). Or it can be difficult socially because people around you have bought into a narrow ideology enshrined in the library. React and Angular when used the way the designers intend and advocate for are much more limiting -- while also having steeper initial learning curves and more complex developer tooling needs than Mithril. Any of them can get mosts jobs done -- but with varying costs in time and frustration from different developer ergonomics.

Here is a document I put together with more details on why overall I prefer Mithril over React and Angular (having used all three for production code):  
https://github.com/pdfernhout/choose-mithril

### Mithril's warts

Every library or framework has various different warts (even Mithril). To be fair to React and Angular, after all those years of work that have gone into them, both have error messages are sometimes better than Mithril's. With Mithril, sometimes it throws an exception and you have to work harder than with React and Angular to figure out exactly what part of your HyperScript code is the offending part. That rarely gets in the way of someone experienced with Mithril, but it can trip up beginners (e.g. having a key on some nodes but not others).

So, if there was one thing I might change about Mithril (assuming it did not break anything else, because it might require an invasive or performance-impacting change) it would be improving some error messages to be more novice-friendly in a way that points to exactly where in your HyperScript code the issue originates. Perhaps that could be written as some optional validating wrapper around the "m" command. 

But in practice, it is mostly a non-issue for me now -- even as while working on these examples I had a head scratcher involving debugging into the Mithril library for a few minutes. It was to understand a message about a missing key ("Vnodes must either always have keys or never have keys!"). As I was converting a big chunk of existing HyperScript code from Maquette to Mithril the issue could have been anywhere. I set the debugger to break on any exception and then used the debugger's hover over variables to figure out what element was being created problematically. Mainly I was looking to find an element name or a piece of text that I could then connect back to a "m" HyperScript call. I could do that relatively quickly and easily after years of JavaScript development -- but a novice might just be stumped there and give up. In Mithril's defense, in practice, if you are just adding a bit of HyperScript at a time and then testing the change right away, it would be more immediately obvious where the issue was introduced and so less of an issue to get a good report about the origin.

Also in Mithril's defense, this is another example of why HyperScript is better than JSX. Because HyperScript it all "just JavaScript" the debugger could be immediately useful in figuring out what went wrong (although source maps do help these days more with the JSX issue). While I don't want to make a virtue out of imprecise-relative-to-code-location error messages, this is an example of where a novice could become a better JavaScript developer in all ways (not just an expert at one API) if they learn how to debug such an error message quickly. So it is maybe a situation where training can substitute for implementation complexity (and the related library maintenance burden).

As I've essentially said elsewhere, using something like Dojo, React, or Angular makes you a better Dojo, React, or Angular programmer. Using Mithril makes you a better JavaScript programmer (and probably a better programmer in general). That may be a little unfair to React in that, some issues aside, it is the least opinionated compared to Dojo and Angular -- even as it is still way more opinionated than Mithril. In any case, part of the choice of Mithril is choosing what programming journey you want to go on -- in terms of what you want to get better at.

### Historical Footnote

Historical footnote: I originally wrote these examples for Maquette (another vdom library). Because Maquette and Mithril both emphasize using HyperScript, the examples were relatively easy to convert from one system to the other in a few hours -- much of which time was from tossing out TypeScript (a fine language for other settings than here) and changing some coding conventions (moving to using double quotes for strings instead of single quotes and also tossing out parentheses). I left the previous "h" use for HyperScript calls for now but otherwise the default is to use "m" for Mithril.
