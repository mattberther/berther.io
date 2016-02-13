---
title: Installing FitNesse as a Service
disqus_identifier: 2006-04-installing-fitnesse-as-a-service
comments: true
---

We've recently taken to [FitNesse][1] to drive our acceptance tests.

One of the frustrations we had with it was getting it to run as a service. I found a neat [article][2] on the fitnesse site that described how to do this.

We ran across a situation that was absolutely maddening, involving running FitNesse as a service. Everything worked wonderfully, until you logged off the machine. At that point, the service would die.

A fair amount of googling led me to this [article][3] at Sun, which seems to suggest that this is actually an issue with the Java VM. 

The fix is easy enough... Pass the -Xrs switch in the AppParameters area for srvany (the last step before 'roll the drums' in the linked instructions).

[1]:http://www.fitnesse.org
[2]:http://fitnesse.org/InstallingFitNesseAsaService
[3]:http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4323062
