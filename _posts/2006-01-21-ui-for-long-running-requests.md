---
title: UI for long running requests
disqus_identifier: 2006-01-ui-for-long-running-requests
comments: true
---

We have an application that given certain inputs can take quite a while to run. The previous solution that we had in place to let the user know what was going on was a popup window that went away after the page completed loading.

This solution has been wrought with problems, not the least of which was the numerous different alogrithms that popup blockers use. One of the worst problems with this technique was the popup window not going away if the task encountered an error.

Mark Wagner has a fantastic [piece of code][1] ([demo][2]) that hooks into the onbeforeunload event to overlay a processing message onto the page. The neat thing about this technique is that there is not much more to do, since everything is automatically unloaded when the next page loads.

This is a fantastic technique and I look forward to finding other useful places to use this.

On a side note, dont you find it funny that the Google popup blocker pops up a popup to tell you that popups are being blocked??

[1]:http://blogs.crsw.com/mark/articles/642.aspx
[2]:http://blogs.crsw.com/mark/samples/BusyBoxDemo/Default.aspx
