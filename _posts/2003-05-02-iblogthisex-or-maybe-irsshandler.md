---
title: IBlogThisEx (or maybe IRssHandler)
disqus_identifier: 2003-05-iblogthisex-or-maybe-irsshandler
comments: true
---

[Luke][1] makes some valid points about the interface [Greg][2], [Simon][3] and I have been discussing.

I do agree with HasEditingGUI to a point. This allows the aggregator to maintain a consistent user interface throughout. However, I see this is perhaps configurable from the plugin. The end user can then decide which to use. Of course, the drawback to using the aggregator's UI is that the user will not be allowed all the extra parameters that the plugin can have. For example, my MovableType plugin would support extended entry, excerpt, keyword, allow comments, etc. The aggregator would probably never know about these.

How about an overloaded version of Configure that could handle placement into an existing configuration dialog, or a popup dialog?

The way I have implemented IBlogThisEx is to check configuration on BlogItem, and if it is not valid, then the configuration dialog comes up.

Lastly, I do agree with the name change. IBlogThis implies an action rather than a grouping of functionality. IRSSHandler has a nice ring to it.

[1]:http://www.hutteman.com/weblog/2003/05/02.html#000079
[2]:http://www.rassoc.com/gregr/weblog/archive.aspx?post=578
[3]:http://www.pocketsoap.com/weblog/2003/04/1239.html
