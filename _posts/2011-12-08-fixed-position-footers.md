---
title: Fixed Position Footers
disqus_identifier: 2011-12-fixed-position-footers
comments: true
---

Posting mostly for my own reference...

One thing I find that I need to do a lot is position a footer bar across the bottom of the page. The most common way to do this is to set a fixed position on the element and anchor it to the bottom using this css:

``` css
#footer {
     width: 100%;
     position: fixed;
     bottom: 0;
     height: 75px;
}
```

Unfortunately, this doesnt work quite right in IE. When using this style definition in IE, the footer gets locked into a specific position in the viewport and when you resize from the corner anchor the footer does not move with the window.

The **proper** cross-browser way to declare a fixed position footer is to use negative margins, like this:

``` css
#footer {
     width: 100%;
     position: fixed;
     top: 100%;
     margin-top: -75px;
     height: 75px;
}
```

This appears to function properly in every browser I've looked at so far.
