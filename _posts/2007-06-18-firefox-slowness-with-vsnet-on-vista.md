---
title: Firefox Slowness with VS.NET on Vista
disqus_identifier: 2007-06-firefox-slowness-with-vsnet-on-vista
comments: true
---

Dan Wahlin is my hero... Ever since I've installed Vista, I've noticed that using Firefox to debug my VS.NET 2005 solutions was painfully slow (like 10-15 seconds per page). I've never bothered to take the time to figure out what was causing it. Instead, I'd just fire up Internet Explorer and go about running the application.

Dan, however, went the extra mile and [figured out what was causing the issue][1]. In short, the slowdown is caused by an IPv6 issue with DNS. The solution is turning off IPv6, which can be done by typing *about:config* in the address bar, finding *network.dns.disableIPv6* and setting it to true.

As it turns out, this is not just a Vista issue, but rather an IPv6 issue. If you have IPv6 installed on XP, you'll like encounter the same issue.</p>

[1]:http://weblogs.asp.net/dwahlin/archive/2007/06/17/fixing-firefox-slowness-with-localhost-on-vista.aspx
