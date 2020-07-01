let newContent = `<div id="hello-demo">
	<div>Hello, world!</div>
	<div id="image-div">
	  <img src="../media/mithril-logo.svg" alt="Mithril Project Logo"></img>
	</div>
	<div class="comment">
	  <em>vdom</em> via Mithril is a <span class="special-text">plausible</span> move for any project
	</div>
	<div class="comment">
	  <em>Shuhari</em> (or <span class="special-text">守破離</span> in Japanese) <a href="https://en.wikipedia.org/wiki/Shuhari">roughly</a> translates to "first learn, then detach, and finally transcend."
	</div>
	<div class="comment">
	  Aikido master Endō Seishirō shihan stated:
	    <blockquote>
	    "It is known that, when we learn or train in something, we pass through the stages of <em>shu</em>, <em>ha</em>, and <em>ri</em>. These stages are explained as follows. In <em>shu</em>, we repeat the forms and discipline ourselves so that our bodies absorb the forms that our forebears created. We remain faithful to these forms with no deviation. Next, in the stage of <em>ha</em>, once we have disciplined ourselves to acquire the forms and movements, we make innovations. In this process the forms may be broken and discarded. Finally, in <em>ri</em>, we completely depart from the forms, open the door to creative technique, and arrive in a place where we act in accordance with what our heart/mind desires, unhindered while not overstepping laws."
	    </blockquote>
	</div>
</div>`

document.body.innerHTML = newContent
