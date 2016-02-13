---
title: Javascript Includes
disqus_identifier: 2007-02-javascript-includes
comments: true
---

Posting mostly for my own reference...

Quite often I seem to find myself googling for how to include a javascript file from another javascript file. I'm posting this here for easy retrieval the next time I need it.

``` javascript
function include(scriptFile) {
 	var headTag = document.getElementsByTagName('head').item(0);
 	var js = document.createElement('script');
 	js.setAttribute('language', 'javascript');
 	js.setAttribute('type', 'text/javascript');
 	js.setAttribute('src', scriptFile);
 	headTag.appendChild(js);
}
```

Wherever you need the javascript, you simply call: `include('scriptname.js');`

Contrasted with the other way of doing javascript includes (building up a script tag and document.writing it into the html, this seems to be the more correct way of doing the include.

Hope you find this useful...
