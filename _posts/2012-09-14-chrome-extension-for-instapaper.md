---
title: Chrome extension for instapaper
disqus_identifier: 2012-09-chrome-extension-for-instapaper
comments: true
---

I use instapaper.com as my read later service. I have installed the Chrome add-on to allow me to quickly tag an article to read later. Also, I have configured it as my read later service in Tweetbot, which allows me to quickly send articles to it for later reading.

The one thing that has always bugged me about the instapaper website is that it does not open links in a new tab/window. To get around this, I set out to create a Chrome extension. This is what I came up with.

``` js
// ==UserScript==
// @name        Instapaper New Windows
// @namespace   http://mattberther.com
// @description Open Instapaper links in a new window
// @include     http://www.instapaper.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function() {
    function loadJQuery(callback) {
        var script = document.createElement("script");
        script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
        script.addEventListener('load', function() {
                var script = document.createElement("script");
                script.textContent = "(" + callback.toString() + ")();";
                document.body.appendChild(script);
            }, false);
        document.body.appendChild(script);
    }

    function main() {
        $("a.tableViewCellTitleLink").attr('target', '_blank');
    }

    loadJQuery(main);
})();
```

Copy the code above and save it to a location on your computer; I called mine instapaper.js. The latest versions of Google Chrome no longer allow you to add extensions from a third party source (like your own computer) by simply clicking on the javascript file. To install the extension, open the extensions window in Chrome and then dragging the file you created onto the window.

Once the extension is activated, any links from your unread list in instapaper.com will open in a new window.
