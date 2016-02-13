---
title: Using Firefox in VS.NET
disqus_identifier: 2006-02-using-firefox-in-vsnet
comments: true
---

I've been searching for this for quite some time, and have finally figured out how to make VS.NET 2005 launch Firefox as the browser when I click F5 to debug.

Right click on an .ASPX file in your web project and click 'Browse With...'. From there, you'll need to click 'Add...' to add your browser to the list. Click the elipsis to find your path to Firefox and then enter a friendly name, such as 'Firefox'. Click OK.

Back at the Browse With dialog, click Firefox and click 'Set as Default' and Browse. Voila!

The only thing that doesnt work quite right is that the application continues to run when you close the browser. You have to click the Stop button. This is not a big deal, but it would be nice if this functioned consistently across the different browsers.

By the way, the same steps work for VS.NET 2003. Although, with VS.NET 2003, you also have to open the project properties page and go to Configuration Properties | Debugging and set 'Always Use Internet Explorer' to false.

I sure wish I would have come across this sooner. :)
