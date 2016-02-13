---
title: Curse thee, IE6
disqus_identifier: 2008-12-curse-thee-ie6
comments: true
---

I work in an environment, where, unfortunately we are somewhat constrained as to which browsers we support. Our target market has a very slow update cycle and our products are not necessarily the kind where the loss of use would force an IT upgrade. Therefore, our ASPNET applications must continue to support IE6.

A few clients have been consistently reporting an issue where in IE6 only images where randomly disappearing after they were clicked on. However, we had never been able to reproduce the issue. Until earlier this week...

The images in question were being toggled dynamically with a bit of javascript that looked something like this:

``` javascript
function toggleImages(id) {
    var img = document.getElementById(id);
    if (img.src == "active.gif") {
        img.src = "neutral.gif");
    } else {
        img.src = "active.gif";
    }
}
```

The html markup for the image display looked like this (with some irrelevant code removed):

``` html
<a href="javascript:void(0);">
    <img id="imageIdentifier" src="neutral.gif" onClick="toggleImages('imageIdentifier');"/>
</a>
```

The first clue that this was something that was caused by IE6 was that 1) no other browser was affected by the way this code was written, 2) it only manifested itself when accessing the web server through a proxy (local hits to a test website failed to reproduce this problem), and 3) only when the 'Use HTTP1.1 for proxy traffic' was selected from the advanced options did we see this.

As we begin to investigate this further, we find a few reports of this issue via Google. The issue has something to do with the events not being fired properly when using javascript in the href attribute. Ultimately, the fix was *very* easy. We simply needed to add a `return false;` after the onClick handler.
