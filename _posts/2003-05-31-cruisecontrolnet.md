---
title: CruiseControl.NET
disqus_identifier: 2003-05-cruisecontrolnet
comments: true
---

I found a very cool open source continuous integration server for C#. [CruiseControl.NET][1] is by [ThoughtWorks][2] (Martin Fowler's company).

CC.NET integrates with several versioning systems, including CVS and VSS. Essentially, what CC.NET does is monitors the source repository and when changes are detected, CC.NET rebuilds the project from an nAnt script.

When this is complete, you can have email sent out to a configurable group of users. Email can be sent to users always or only on change (ie: build broken or fixed). CC.NET also includes a web site so you can view previous build results. All output is customizable via XSLT.

We are using it currently on a project Im involved with at work, and finding it very useful. We are working on a very rapid development project, and because of the nant scripts that were generated, we have the most recent successful build available at all times in a .zip format.

While CC.NET is not perfect, it is very nice for a 0.2 version. One of my biggest complaints about it is having to look through XML to find the error message. Granted, because all presentation is handled by XSLT, this is a complaint right now because Im too lazy to put it in there. The other thing that I ran across was having to modify some code to get it to run as a service. The XSL paths were relative paths, and since services typically run out of the Windows\System directory, it was looking for them there, rather than in the application directory. I do love open source. :=)

I'm looking forward to seeing this project evolve. A definate +1.

[1]:http://www.continuousintegration.net
[2]:http://www.thoughtworks.com
