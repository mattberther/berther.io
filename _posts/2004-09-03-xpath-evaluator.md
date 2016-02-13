---
title: XPath Evaluator
disqus_identifier: 2004-09-xpath-evaluator
comments: true
---

Earlier today, I had a need for an XPath evaluator. I had an enormous XML document that I wanted to execute an XPath query against.

I turned to Google... surprisingly enough, this type of utility appears to be very uncommon. I found only a few hits.

One for this web application thing that I remember seeing a while back. This was undesirable to me, because I didnt want to create a VROOT and install a web application to process some XML.

Another was for what looks like a pretty cool xml editor ([Stylus Studio][1]). Although this looks very cool, and worthy of a second look in the future, at this time I did not want to install a full fledged xml editor just to run an XPath query.

Ultimately, I stumbled across this small console application called [XPQ][2] by Craig Andera. Drawback? You have to compile it, but hey, I can deal with that. :=)

Once you compile it, you run it like this:

``` console
xpq <xpath> <input-file>
```

For example, to get the number of "foo" nodes from a document:

``` console
xpq count(//foo) doc.xml
```

This is the simplicity and power I was looking for. Great job, Craig, and thank you.

[1]:http://www.stylusstudio.com/
[2]:http://pluralsight.com/blogs/craig/archive/2004/05/25/1420.aspx
