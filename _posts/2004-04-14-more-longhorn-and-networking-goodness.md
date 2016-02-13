---
title: More Longhorn and Networking goodness
disqus_identifier: 2004-04-more-longhorn-and-networking-goodness
comments: true
---

Several months ago, I figured out how to get the internet connection working properly through Longhorn.

Recently, I managed to really screw up my image so I ended up rebuilding it. This time, I investigated this a little bit more, and what I saw was that in my case, Longhorn was actually creating two LAN connections for me.

The second one for some reason was not getting the gateway initialized properly. I understand that the reason I got two set up may be because I have both a wireless and a 10/100/1000 adapter on this machine.

However, rather than going through all the hassle of modifying my startup scripts to do the route change all the time, the fix this time entailed simply disabling the second LAN connection.

You can see if you are suffering from the same problem by doing an ipconfig from the command line. If you are seeing two adapters, you should more than likely be able to disable the one that isnt working (ie: right click on it in the Network Connections and click Disable).

This got me up and running. Hopefully, it helps someone else as well.
